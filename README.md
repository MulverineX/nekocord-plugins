# My Nekocord Plugins
Monorepo memes

## WIP Plugins
Plugins I'm actively working on

### Rich Quotes Redux
A successor to the legendary Powercord plugin, [Rich Quotes](https://github.com/AAGaming00/rich-quotes). ([yes](https://user-images.githubusercontent.com/14880945/104736592-80303380-5743-11eb-8224-2bae4fab6f15.png))

[Insert showcase GIF]

<details>
<summary>Planned Features</summary>

 - (Rich) Quotes
   - Customizable markdown formatted quote inserts.
   - Rendered natively for all plugin users via encoded ZWC markers.
   - Supports attachments.
   - Supports insertion of [bracketed inference] into the quote.
   - Supports selection (highlight) of a specific part of a message and/or message group.
   - When not selecting, defaults to a customizable character count.
   - Optionally removes Reply, Forward, & Copy Message Link buttons.
   - By default attaches to the chatbox across channels & can be further customized before sending.
   - Supports directly inlining (at risk of losing ZWC if edited).
   - Supports pre-send text replace hooks.
     - Server/channel is saved upon copying the message id, if copied externally you will prompted to search for the channel in a modal before your message is sent.
     - `\n> %message_id_here%\n` or `\nmessage_link_here\n for inlined quotes.
     - `[%message_id_here%]` or `text here message_link_here more text here` for counted references (upon sending, each reference becomes `[#number](message_link)` & a default (rich) quote is added at the end of the message unless configured otherwise).
 - Customizable in-chat message quote widget that replaces:
   - Replies
   - Forwards
   - Message Links
   - (Rich) Quotes
 - Customizable per-author & per-channel message resolver limits.
 - Customize whether different quote types resolve messages automatically or rely on the immediate message contents.
 - Click on partial/unresolved quote widgets to manually expand/resolve them.
 - Customizable message cache.
</details>

## Plugin Ideas
Not necessarily original or something I will actually get around to making

### Rich Image Viewer
A spiritual successor to Lighty's BetterImageViewer

<details>
<summary>Planned Features</summary>

 - Adds ability to view all images across the app (avatars, banners, server logos, emojis, stickers, role icons, group icons, badges)
 - Option to revert multi-attachment UI or use an inline carousel.
 - Option to swap out Discord's GIF search for other (better) engines.
 - Image viewer built completely custom to avoid constant breaking changes from Discord.
 - Zooming with customizable scope, size, and mode (different upscaling algo's & nearest neighbor).
 - In-app or external Image Reverse Search from several services.
 - Channel carousel (uses the Search API to find all images posted to the channel and allows you to browse through all of them).
 - Image downloader (downloads to a set directory, can be in sub-folders for different categories).
   - Supports feeding external links to system-installed yt-dlp to get original quality.
   - Embeds/opens images from downloads instead of from discord's cdn.
   - Supports timed or directory size based storage management
 - AI image upscaling
   - Supports scraping free sites
   - Supports various local upscaler CLIs
     - [Upscayl](https://github.com/upscayl/upscayl-ncnn)
     - [waifu2x-ncnn-vulkan](https://github.com/nihui/waifu2x-ncnn-vulkan)
     - [waifu2x-caffe](https://github.com/lltcggie/waifu2x-caffe) (Windows only)
</details>