---
title: How I record virtual events hosted on Discord
date: 2022-12-16
excerpt: Sounds straightforward, but it isn't really. Here's how I do it using only free and included software on MacOS.
tags: post
---

# How I record virtual events hosted on Discord

Over the past year, I've been working with my business partner Chris Reed at [Super Basic](https://superbasic.xyz) to strengthen the development and engineering community here in the Dallas/Fort Worth Metroplex.

We started a Meetup group, called [Full Stack DFW](https://fullstackdfw.com), where we host a monthly virtual event at 12:30 CT on the second Wednesday of every month. We have cleverly titled this series the "Lunch and Learn" series.

All our talks are recorded and then posted to our [Youtube Channel](https://www.youtube.com/channel/UCQXogK1LsaUnMAefsG9255w). Having no prior experience recording virtual events, it took a while to get this process smoothed out, so I thought I'd share our process.

## Software used

- [Discord](https://discord.com)
- [Blackhole](https://github.com/ExistentialAudio/BlackHole#installation-instructions)
- Quicktime Player
- Audio MIDI Setup

## Setting up Blackhole

Blackhole is "a modern virtual audio loopback driver" that lets us create virtual audio input and output devices. What it allows us to do is pipe the audio from Discord, and Discord only, to our screen recorder, without capturing anything unwanted, for instance the audio notifications from Slack or Messages. In our case, we wanted the audio from the person doing the screen recording to also be recorded, so they could participate in the conversation.

First we install Blackhole, following the instructions in the link above. Once it installed, we can open the MacOS application Audio MIDI Setup to create our virtual devices. In this case, we can get away with installing the Blackhole 2ch (two-channel) driver: `blackhole-2ch`.

**Create an Aggregate Device**

In Audio Midi Setup, we click the "+" plus icon in the bottom left corner and select "Create an Aggregate Device".

In the "Use" column, we check "Blackhole 2ch" and the microphone input we want to use. In my case, this was the input from my cheapo headphones "Soundcore Life 2".

{% image "src/images/posts/recording-a-virtual-talk-on-discord-with-macos/aggregate-device-config.png", "Screenshot showing Audio MIDI Setup window with an aggregate device created as described in the text above.", 600 %}

This device will be what our we tell our screen recorder to use as our audio source.

**Create a Multi-Output Device**

The Multi-Output device allows us to monitor the audio that is coming into Blackhole.

We check "Blackhole 2ch", our output of choice, and due to some peculiarities of MacOS's audio drivers that I do not fully understand "Macbook Pro Speakers" (or whatever your internal speakers are). If you don't want the sound to come over you internal speakers, choose them in the list in the sidebar, and click *Mute*.


{% image "src/images/posts/recording-a-virtual-talk-on-discord-with-macos/multi-output-device-config.png", "Screenshot showing Audio MIDI Setup window with a multi-output device created as described in the text above.", 600 %}

**Section summary**

1. Install `blackhole-2ch`
2. Open **Audio Midi Setup** and click the **+** plus sign in the bottom left.
3. **Create an Aggregate Device** and check **Blackhole 2ch** and any other input you want to record.
4. Click the **+** plus sign again
5. **Create Multi-Output Device** and check **Blackhole 2ch**, your **internal speakers**, and your preferred monitoring device. Mute your internal speakers if you wish.

## Setting up Discord audio

**Discord > Preferences > Voice & Video**

Change your input device to **Aggregate Device** and your output device to **Multi-Output Device**.

{% image "src/images/posts/recording-a-virtual-talk-on-discord-with-macos/discord-audio.png", "Screenshot showing Discord audio setup as described in the text above.", 600 %}

## Setting up Quicktime Player

**File > New Screen Recording**

A dialog will open with some controls. Click the **Options** dropdown and set the microphone to **Aggregate Device**

You're ready to record!

## Setting up Discord video

Hop into the video channel. Select the stream. Click the full screen icon in the bottom right. Change the view from Grid to Focus in the top right. In the menu behind the kebob icon in the top right, uncheck "Show Non-video Participants". At the bottom center, click the "Hide Members" button. You now have an uncluttered video stream to record in full screen.


