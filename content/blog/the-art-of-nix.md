---
title: 'NixOS: A Developer-First Linux System'
description: 'How Nix and NixOS could change the future of Linux. All the benefits for a developer and much more.'
tags: Linux
date: 2024-01-26
---

## Intro

To begin, we should talk a bit about what **Nix** is. **Nix** is a **declarative
package manager** that allows users to **declare** the desired state of their
system in configuration files. We'll certainly dive deeper into **Nix** later!

**NixOS** is a collection of amazing utilities. Although, well, it's an OS
(operating system) based on Nix. Declarative, reproducible, configurable.
Incredible. I'll tell you more now!

## NixOS:

### Declarative Configuration, OS as Code:

- **NixOS** uses, as mentioned previously, declarative configuration. It's
  possible to manage these configurations with **git**, which allows restoring
  the system to **any historical state**. As long as the configuration files
  are preserved.
- **Nix Flakes** further improves reproducibility using a version lock file,
  like `package-json.lock`, called **flake.lock**. It records sources, hashes
  and other relevant information like dependencies.

### System Customization:

- With just a few configuration changes you can **very easily** substitute
  various system components.
- The modifications are safe. And switching between different desktops (KDE,
  GNOME, Hyprland, LeftWM) is **simple**. No mess.

You've probably experienced it at some point - wanting to switch from **KDE** to
**GNOME** but not knowing which dependencies to remove, what to take out, what
to keep. Here it's simple and effective:

```nix
# Reemplazas plasma5 por gnome
xserver = {
  enable = true;
  desktopManager.plasma5 = {
    enable = true;
  };
}
```

### Rollback:

- It's possible to return to any previous state of the system. By default, in
  **NixOS**, during system boot you will see previous versions of the
  system.

```bash
# GNU GRUB VERSION 2.02
*NixOS - Configuration 129 (2024-01-23)
*NixOS - Configuration 128 (2024-01-16)
*NixOS - Configuration 127 (2023-1l-28)
```

### No dependency conflicts:

_In other distros, I won't name anyArch! you've probably encountered this problem. You can't install or remove a program because it depends on another program, which happens to be a dependency of something else._

- In **Nix** each software package has **a unique Hash** that is incorporated into its installation path. This also allows multiple versions of the same package to coexist.

### The community is enormously active.

- The official repository (**nixpkgs**) has many contributors. And many people share their **Nix** configurations. Therefore when exploring the ecosystem you'll find that the community is huge: Github, Discord, Telegram, etc.

## Nix Development Environments

Both **Nix**, **NixOS** and **nixpkgs** allow you to create specific **Development Environments** for each project.

To better illustrate this we can create a flake similar to this:

```nix
{
  description = "Example JavaScript development environment";

  # Flake inputs
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
  };

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        "aarch64-linux" # 64-bit ARM Linux
        "x86_64-darwin" # 64-bit Intel macOS
        "aarch64-darwin" # 64-bit ARM macOS
      ];

      # Helper to provide system-specific attributes
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      # Development environment output
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          # The Nix packages provided in the environment
          packages = with pkgs; [
            nodejs_18 # Node.js 18, plus npm, npx, and corepack
          ];
        };
      });
    };
}
```

Assuming we have this in **Github**, we can run it like this:

```bash
nix develop "github:linuxmobile/dotfiles#javascript"
```

A **shell** would open looking like this:

```bash
(nix:linuxmobile-env) bash-5.1$
```

If we check the Node.js version:

```bash
type node
```

It would return:

```bash
node is /nix/store/i88kh2fd03f5fsd3a948s19gliggd2wd-nodejs-18.12.1/bin/node
```

Now imagine this same thing but with **Rust**, **Go**, **Haskell** and other languages. You could have an independent development environment separate from your system. You could have Node.js 18 for 'X' project and Node.js 22 for another.
