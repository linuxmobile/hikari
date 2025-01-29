---
title: 'Mastering Development with Nix'
description: 'Explore how Nix, Flakes, Home-Manager and DevShells are revolutionizing software development, offering a reproducible and declarative environment. Discover why NixOS stands out among other Linux distributions and operating systems'
tags: Linux
date: 2024-03-12
---

## Intro

Let's talk about **Nix** and **NixOS**, and although we've touched on them
before, it never hurts to reiterate their importance in the development
universe. Think of it this way: **Nix is that star tool that helps you avoid
those moments of frustration** when your code doesn't work on another machine
but works fine on yours. It's like the hero you didn't know you needed.

On the other hand, we have **NixOS**, which is not your typical Linux
distribution. This operating system **is based on the power of declaration**:
_you tell it how you want your environment to be configured, and it takes care
of making it happen_. And if something doesn't go as expected, you can return to
your previous configuration without problems. Imagine having the ability to
"undo" in real life, applied to the configuration of your system.

In essence, with **Nix** and **NixOS** you're leveling up. You forget about the
typical problems of _"but it works on my machine"_ and immerse yourself in a
world where everything is **reproducible, secure** and, most importantly,
without unwanted surprises. And we know how crucial it is to have reliable
tools, especially when we talk about technology.

## Flakes

In the world of **Nix**, **Flakes** represent a revolution. But what exactly are
they? Imagine you're putting together a puzzle, but instead of blindly searching
for the right pieces, you already have a **predefined set** that fits perfectly.
That's essentially what **Flakes** do in **Nix**: they provide you with a
framework to manage your projects and their dependencies in a more organized and
reproducible way.

The key to **Flakes** is that everything is defined **declaratively** in a file
called `flake.nix`. This file specifies not only what packages and versions you
need, but also how to build your project. Thanks to this, anyone (or any
machine) that uses your **Flake** will get exactly the same development
environment and results, regardless of where it's executed.

```nix [file.nix]
{
  description = "A basic Rust devshell for NixOS users developing Leptos";

  inputs = {
    nixpkgs.url      = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url  = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, rust-overlay, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
      with pkgs;
      {
        devShells.default = mkShell {
          buildInputs = [
            openssl
            pkg-config
            cacert
            cargo-make
            trunk
            (rust-bin.selectLatestNightlyWith( toolchain: toolchain.default.override {
              extensions= [ "rust-src" "rust-analyzer" ];
              targets = [ "wasm32-unknown-unknown" ];
            }))
          ] ++ pkgs.lib.optionals pkg.stdenv.isDarwin [
            darwin.apple_sdk.frameworks.SystemConfiguration
          ];

          shellHook = ''
            '';
        };
      }
    );
}
```

In this case, we are defining a development environment (`devShell`) that simply
includes the packages needed to work with **Leptos**. When using this Flake, it
doesn't matter if you're in Argentina, Spain or anywhere else in the world; your
project will be built with the same dependencies, avoiding the famous "works on
my machine".

**Flakes** greatly simplify dependency management and ensure that everyone is on
the same page, literally. Thus, we say goodbye to unwanted surprises and welcome
an era where reproducibility and clarity in our projects are the norm.

### Advantages of using Flakes

When adopting **Flakes**, you're not just choosing another tool, you're
_embracing a set of principles that can radically transform the efficiency and
reliability of your projects_. Here I detail some of the key advantages:

- Immutability:

**Flakes** ensure the immutability of environments. When you specify a Flake,
**you're fixing the versions of all dependencies that your project uses**. This
means that every time someone builds your project using the Flake, they'll get
exactly the same result, eliminating the classic problem of "it works on my
machine, but I don't know why not on yours". Immutability provides a solid
foundation for reproducibility and reliability in software development.

- Reproducibility:

Following immutability, **reproducibility** is another notable advantage.
Projects built with **Flakes** can be reproduced on any machine without
surprises. This is crucial not only for developers working in teams, but also
for production deployments, where consistency between development, testing and
production environments is fundamental.

- Easy sharing of development environments

With **Flakes**, sharing a complete development environment with someone else is
as simple as sharing your project repository. There's no need to handle complex
installation guides or custom configuration scripts. Everything needed to build
and run your project is specified in the Flake, facilitating collaboration and
ensuring that new contributors can start working without obstacles.

Example: To use my Rust work environment:

```bash
nix develop github:linuxmobile/kaku#rust
```

- Aislamiento de dependencias

- Controlled and secure updates

## Home-Manager

**Home-Manager** is your best friend when it comes to customizing your user
environment in **NixOS** or any system that uses **Nix**. This powerful manager
allows you to **declare your user configuration**, from your dotfiles to your
favorite applications and their configurations, all in one place. The magic
behind this is that **you can perfectly replicate your environment on any other
machine with Nix**, simply by taking this configuration with you.

How does it do it? Through declarative configuration files that specify exactly
how you want your environment to be. This means that, instead of manually
installing and configuring every aspect of your system, you define everything in
a `home.nix` file, and **Home-Manager** takes care of the rest.

For example, if you want to have **Zsh** as your shell, **Vim** as your editor,
and **git** configured with your credentials, your **home.nix** could look
something like this:

```nix
{ config, pkgs, ... }:

{
  programs.zsh.enable = true;

  programs.vim = {
    enable = true;
    defaultEditor = true;
    plugins = with pkgs.vimPlugins; [
      youcompleteme
      vim-airline
    ];
  };

  programs.git = {
    enable = true;
    userName = "Tu Nombre";
    userEmail = "tuemail@example.com";
    extraConfig = {
      core = {
        editor = "vim";
      };
    };
  };
}
```

With this simple configuration, you no longer have to spend hours configuring
your environment every time you change machines or reinstall your system. You
simply take your `home.nix` file with you, run **Home-Manager**, and it
recreates your environment exactly as you defined it, no matter where you are.

**Home-Manager** transforms your user environment customization into something
**reproducible** and pain-free. It's like having a personal recipe for your
system, ensuring that no matter where you dive in, you'll always feel at home.

## DevShells

**devShells** are like your personalized workstation for each project, set up
and ready for you to dive into development without delay. _Imagine being able to
transport your entire development environment, with the exact tools and
dependencies you need, to any machine_. That's exactly what **devShells** allow
you to do.

When you use `nix develop` or `nix-shell`, you're invoking these reproducible
development environments. Put simply, you create an environment where everything
you need to work on your project is at your fingertips.

Let me show you an example of what a **devShell** might look like in a
`flake.nix` file for a **Python** project:

```nix
{
  description = "Un entorno de desarrollo para mi proyecto Python";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.python3
            pkgs.python3Packages.virtualenv
          ];
          shellHook = ''
            echo "Bienvenido a tu devShell de Python"
          '';
        };
      });
}
```

We set up an environment with **Python** and **Virtualenv** already installed.
When running `nix develop`, you'll find yourself in a shell where Python and
Virtualenv are ready to use. And best of all, if someone else needs to work on
your project, they just need this Flake to have the same environment as you,
thus eliminating any inconsistency between work environments.

### Comparison:

When comparing Nix's `devShells` with other development environment solutions,
like **Docker**, **virtualenv** or even virtual machines, there are some key
differences that stand out, especially in terms of efficiency, reproducibility
and version management.

- Efficiency and Speed

DevShells start almost instantly and **require fewer resources** than starting a
full virtual machine or Docker container for each project. While Docker and VMs
can completely isolate your environment, they can be excessive for development
needs, consuming more system resources and setup time.

- Reproducibility

- Version Management

Example:

```nix
{
  devShells = {
    mi-proyecto = pkgs.mkShell {
      buildInputs = [ pkgs.nodejs-14_x pkgs.nodePackages.yarn ];
    };
  };
}
```

This approach is clean, declarative and avoids having to deal with global nvm or
npm that could conflict with other projects.

## Summary

Choosing **Nix** and its associated tools, like **Flakes**, **Home-Manager**,
and **DevShells**, means choosing a path towards more efficient and
headache-free development. In short, if you're looking for **an environment that
guarantees reproducibility, flexibility, and efficiency**, giving you the peace
of mind that _"if it works here, it works everywhere"_, **Nix** is your best
bet. It is, without doubt, the tool that every programmer should consider to
take their projects to the next level, ensuring coherence and quality in
software development.
