---
title: Declutter your WordPress development environment with Docker, Part 1
date: 2022-02-02
excerpt: See the light
tags: post
---

# Declutter your WordPress development environment with Docker, Part 1

WordPress isn't the sexiest application framework (yep) around, but it hits a sweet spot for a lot of organizations that need a relatively low-fuss web presence. It gets a lot of things right, but though it has made some large strides in this department, the developer experience still feels a bit undercooked.

In my years leading a development team juggling a large collection of WordPress projects, I found that one of the most time consuming parts of each project was simply getting and keeping them running uniformly across each team member's machine.

There are many approaches to this problem, and I gave pretty much all of them a shake before I landed on my preferred approach.

## The criteria

Changes in process are expensive. For it to be worth my time trying to get buy-in from my organization, I needed a few criteria to be met.

1. **DevOps as code.** Everything about the environment should be trackable in version control.

2. **Consistent**. It should work the same on everyone's machine.

3. **Works with existing processes** It should slot nicely into our existing processes with minimal disruption.

4. **Fast.** It should be fast to start up, and fast to reprovision when testing new configurations.

5. **Understandable.** Learning this stuff should be within the reach of the average developer. No rocket science.



## The contenders



1. **XEMP** - Old school setup. Just run nginx, mySQL, and PHP directly on the development machine.

2. **Vagrant** - Write a provisioning script to install and maintain everything on a virtual machine.

3. **Local** - Heavily integrated development environment for working with WPEngine.

4. **Docker** - Use Docker Compose to provision and run a development environment in containers.



## The results

|                               | XEMP | Vagrant | Local | Docker |
| ----------------------------- |:----:|:-------:|:-----:|:------:|
| DevOps as code                | ❌    | ✅       | ❌     | ✅      |
| Consistent                    | ❌    | ✅       | ✅     | ✅      |
| Works with existing processes | ✅    | ✅       | ❌     | ✅      |
| Fast                          | ❌    | ❌       | ⚠️    | ✅      |
| Understandable                | ⚠️   | ❌       | ✅     | ⚠️     |



## Breaking it down: XEMP

With a local XEMP stack, managing different versions of your stack becomes difficult once you have more than one or two projects. Ever tried to manage multiple versions of mySQL on the same box? It isn't pretty. Add in the fact that there doesn't seem to be an industry standard version manager for PHP like you have for other programming languages and you see where I'm going with this. NOWHERE.

## Breaking it down: Vagrant

Vagrant gets pretty close to the mark, and for a long time it was my gold standard. I could write one provisioning script, track it in version control, and share it with the entire team. Because everything is running on a virtual machine, we could have a reasonable level of confidence that everybody's evironment was configured the same way.

The issue you encounter right off the bat is with the amount of time it takes to provision a new machine. Downloading and installing an entire operating system to a virtual machine takes a while! This isn't a big deal when things are working correctly, but when the provisioning script takes twenty minutes to run from scratch and you are testing it for the twentieth time, the pain is real.

## Breaking it down: Local

Local makes a lot of tasks really easy. Want to switch between Apache and nginx? Easy. Want to test your website on a new version of PHP? No sweat. Where it begins to break down is when you want to integrate it into your already existing version control workflow. I spent a while trying to figure out a pattern for say, pulling down a project from WPEngine using Local, and then configuring it to push to an already existing Github repository. I couldn't manage to find an intuitive way to do this. I did manage to pull it off a few times, but it generally felt like I was swimming against the current to get there, and I definitely didn't feel comfortable trying to onboard anyone else on my team with that process.

## Breaking it down: Docker

While there is an initial learning curve with a tool like Docker, it has the benefit of solving both of these problems. We can easily test our codebase against the latest version of PHP without busting our stack for a client's legacy projects. And we can maintain a Git workflow that doesn't require us to do backflips just to track our commits.

It is also not as scary as it may sound to the uninitiated. I'm going to show you how, by initializing a new WordPress project, and running it all in Docker containers.





