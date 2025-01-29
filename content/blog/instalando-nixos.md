---
title: 'NixOS Installation & Configuration Guide'
description: 'Installing NixOS, Home-Manager, Flakes. And how to understand a reproducible configuration'
tags: Linux
date: 2024-01-26
---

:::alert{class="alert alert-info"}

This article is part of a draft. It may be incomplete.

:::

## Intro

![](https://i.imgur.com/FmGUopQ.png)

## Kaku (my configuration)

Today I want to explain some parts of
[my personal configuration](https://github.com/linuxmobile/kaku).

If you want to know a bit about my configuration you can run:

```bash
› nix flake show github:linuxmobile/kaku
github:linuxmobile/kaku/8394cdcfd946c9620d202fec46f5eb625812c826
├───devShells
│   └───x86_64-linux
│       └───default: development environment 'nixland'
├───formatter
│   └───x86_64-linux: package 'alejandra-3.0.0'
├───homeConfiguration: unknown
├───nixosConfigurations
│   └───aesthetic: NixOS configuration
├───nixosModules
│   └───theme: NixOS module
└───packages
    └───x86_64-linux
        ├───biome: package 'biome-1.5.3'
        ├───repl: package 'repl'
        └───wezterm: package 'wezterm-unstable-e3cd2e93d0ee5f3af7f3fe0af86ffad0cf8c7ea8'
```

### Flake.nix

```bash
├── home
│   ├── editors
│   ├── profiles
│   ├── services
│   ├── software
│   ├── terminal
│   ├── default.nix
│   └── specialization.nix
├── hosts
│   ├── aesthetic
│   └── default.nix
├── lib
│   ├── theme
│   ├── default.nix
│   └── repl.nix
├── modules
│   ├── theme
│   └── default.nix
├── pkgs
│   ├── biome
│   ├── repl
│   ├── wezterm
│   └── default.nix
├── system
│   ├── core
│   ├── hardware
│   ├── network
│   ├── nix
│   ├── programs
│   ├── services
│   └── default.nix
├── .envrc
├── flake.lock
└── flake.nix
```

In this section we can see **six** main configuration folders. Each one serves
an important function. _Let's explain each one step by step:_

### Home

```bash
| Name                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| default.nix         | Special Home-Manager configuration                      |
| editors             | Helix & VSCode                                          |
| profiles            | Device profiles, configuration entry point              |
| programs            | Programs, media, etc.                                   |
| services            | Services like ags, etc                                  |
| terminal            | Terminal programs, shells, etc                          |
| specialisations.nix | Special Light/Dark configuration                        |
```

- **Editors**: Logically contains the text editors you need.
- **Profiles**: It's recommended to create your own profile and add it to
  `default.nix`. Later you'll link it to the `Host` configuration.
- **Programs/Software**: This section contains general software.
- **Services**: Logically contains services or programs that act as services.
- **Terminal**: Zsh, CLI tools and more.

### Hosts

```bash
| Name      | Description                    |
| --------- | ------------------------------ |
| aesthetic | LinuDev's Main Computer        |
```

All `hosts` share configuration in `modules/core.nix`. Host-specific
configurations are stored within the specific host directory. Each host imports
its own modules within `default.nix`.

Therefore, it's recommended to create a folder in `hosts`. Inside that, create a
`default.nix` and include what you extract from the `nixos-generate-config`
command.

### Lib

_Various functions that I use throughout the configuration_

```bash
| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| colors      | Function to handle system colors             |
| default.nix | Module for flake-parts                       |
| repl.nix    | Cool Nix REPL wrapper                        |
| theme       | Program that I reference later               |
```

### Pkgs

Some packages I can't find or that I prefer to package myself.

```bash
| Name    | Description                                          |
| ------- | ---------------------------------------------------- |
| biome   | Biome.js, nixpkgs updates too slowly                 |
| repl    | auto-loads system flake in current dir               |
| wezterm | There was a Wayland issue, I fix it here             |
```

### System

_These are currently the modularized system settings_

```bash
| Name     | Description              |
| -------- | ------------------------ |
| Core     | Shared configuration     |
| Hardware | Hardware config          |
| Network  | Network config           |
| Nix      | Nix-related              |
| Programs | System software          |
| Services | System services          |
```

- In `core` we find the user configuration, boot configuration (shared across
  all PCs)
- In `hardware` you can change GPU drivers
- In `network` you'll find network-related settings
- In `nix` contains configuration for nh, nixpkgs and more
- In `programs` contains system fonts, home-manager, xdg and more
- In `services` contains system services, localization, pipewire, etc.

Highly recommended: review each folder and see what is necessary and what isn't.

## Fresh Installation

_If you're doing a fresh installation and want to have the same configuration as
me, it's not too complex._

1. You'll need to partition the disk:

- My recommendation is always three partitions: `Home`, `Root` and `EFI`.
- You can use `gdisk` if you're using `UEFI`.

```bash
# This is an example
gdisk /dev/nvme0n1 # I use nvme

# 'o' letter to create a new partition table
# 'n' to add partition (EFI) type ef00
# etc...
```

2. Format the partitions with `mkfs`.

- I use xfs for the system.

3. Mount the partitions

```bash
# this partition format is my example. MY EXAMPLE ;)
mount /dev/disk/by-label/NIXOS /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-label/EFI /mnt/boot
```

4. Enable nixFlakes and git to use my configuration

```bash
nix-shell -p nixFlakes git
```

5. Clone my repo with git

```bash
# Clone it to /mnt/etc/nixos
# If you don't have the /mnt/ folder it's because you didn't mount the partitions correctly!
git clone --depth 1 https://github.com/linuxmobile/kaku /mnt/etc/nixos
```

6. You need to generate `nixos-generate-config` for proper installation.

```bash
# In this case remember that HOSTS is the folder where you put your config,
# In my case it's aesthetic, so I use it as an example
sudo nixos-generate-config --dir --force /mnt/etc/nixos/hosts/aesthetic
```

7. Go to the folder and install my configuration:

```bash
# Go to the mnt folder if you're not there
cd /mnt/etc/nixos/

# In my case it's .#aesthetic, if you gave it your host or user name
# You should replace it
nixos-install --flake .#aesthetic
```
