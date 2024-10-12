import { Plugin } from "../../nekocord-priv/types/PluginManager"
import {
    MessageActionCreators,
    MessageStore,
} from "../../nekocord-priv/webpack/WebpackModules"
/**
 * - `[%1234567890123456%]` - Reference quote a message by ID.
 * - `\n%1234567890123456%\n` - Inline quote a message by ID.
 * - https://discord.com/channels/1234567890123456/1234567890123456/1234567890123456 - Quote a message by link.
 */
const RQ_TEST_REGEX =
    /(?:\[\%\d{16}(?:\d+)?\%\])|(?:(?:^)|(?:\n)\%\d{16}(?:\d+)?\%(?:$)|(?:\n))|(?:https\:\/\/discord\.com\/channels\/\d{16}(?:\d+)?\/\d{16}(?:\d+)?\/\d{16}(?:\d+)?)/

const RQ_CAPTURE_REGEX =
    /(\[\%(\d{16}(?:\d+)?)\%\])|((?:^)|(?:\n)\%(\d{16}(?:\d+)?)\%(?:$)|(?:\n))|(https\:\/\/discord\.com\/channels\/\d{16}(?:\d+)?\/(\d{16}(?:\d+)?)\/(\d{16}(?:\d+)?))/g

export class RichQuotes implements Plugin {
    info = {
        name: "Rich Quotes Redux",
        id: "mulverinex:rich_quotes",
        authors: [{ name: "mulverinex", id: "178551656714076161" }],
        description: "Better message quoting for Nekocord.",
        version: "0.1.0",
        patches: [
            {
                find: ".handleSendMessage,onResize",
                replacement: [
                    {
                        // props.chatInputType...then((function(isMessageValid)... var parsedMessage = b.c.parse(channel,... var replyOptions = f.g.getSendMessageOptionsForReply(pendingReply);
                        // Lookbehind: validateMessage)({openWarningPopout:..., type: i.props.chatInputType, content: t, stickers: r, ...}).then((function(isMessageValid)
                        match: /(type:this\.props\.chatInputType.+?\.then\()(\i=>\{.+?let (\i)=\i\.\i\.parse\((\i),.+?let (\i)=\i\.\i\.getSendMessageOptionsForReply\(\i\);)(?<=\)\(({.+?})\)\.then.+?)/,
                        // props.chatInputType...then((async function(isMessageValid)... var replyOptions = f.g.getSendMessageOptionsForReply(pendingReply); if(await Vencord.api...) return { shoudClear:true, shouldRefocus:true };
                        replace: (_, rest1, rest2, parsedMessage, channel, replyOptions, extra) => "" +
                            `${rest1}async ${rest2}` +
                            `if(await $self._handlePreSend(${channel}.id,${parsedMessage},${extra},${replyOptions}))` +
                            "return{shoudClear:true,shouldRefocus:true};"
                    }
                ]
            },
        ],
    }

    _handlePreSend = (channelId: string, messageObj: any, extra: any, replyOptions: any) => {
        extra.replyOptions = replyOptions
        this.pre_send(channelId, messageObj)
        return false
    }

    quote_message_store = {
        messages: {} as Record<string, { channel_id: string, index: number, data: any }>,
        taken_slots: new Set() as Set<number>,
        message_times: [] as ([number, string] | undefined)[],
        max_messages: 30,
    }

    constructor() {
        this.quote_message_store.message_times = Array.from(
            { length: this.quote_message_store.max_messages },
            () => undefined,
        )
    }

    pre_send = (current_channel: string, msg: any) => {
        const match_replace_hooks = msg.content.matchAll(RQ_CAPTURE_REGEX)

        let done = false

        do {
            const match = match_replace_hooks.next()
            if (match.done) {
                done = true
                break
            }

            if (match.value) {
                const replace_hook: string = match.value[0]
                const message_id: string = match.value[3] || match.value[2]
                let channel_id: string | undefined = match.value[3] !== undefined ? match.value[2] : undefined

                let message_data: any

                if (channel_id === undefined) {
                    let in_store = this.quote_message_store.messages[message_id]

                    if (in_store) {
                        channel_id = in_store.channel_id

                        message_data = in_store.data

                        this.quote_message_store.message_times[in_store.index][0] = Date.now()
                    } else {
                        // TODO: Prompt to search for channel
                        return { cancel: false }
                    }
                }
            }
        } while (!done)

        return { cancel: false }
    }
}