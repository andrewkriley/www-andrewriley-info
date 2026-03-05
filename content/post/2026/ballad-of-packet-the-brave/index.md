---
title: "The Ballad of Packet the Brave"
description: A heroic tale of a data packet's journey across a homelab network — its perils, its triumphs, and the unfinished business that stood between the realm and true peace.
date: 2026-03-05T00:00:00+11:00
tags:
    - homelab
    - networking
    - meraki
    - unifi
    - security
categories:
    - technology
---

In an age before memory, when the wild winds of the **Internet** howled across the land with neither mercy nor direction, there arose from the chaos a lone traveller. They called him **Packet**.

Packet's journey began, as all great journeys do, at a gate.

---

## The Twin Gatekeepers

At the edge of the known world stood two great fortresses — the **MX68 of the Northern Realm** and its cousin, the **MX68CW of the Far Spoke**. Mighty sentinels, bound by an ancient **Site-to-Site covenant**, they faced the howling internet together, each holding their WAN active, each watching the other's flank across the void.

The Northern MX68 was the mightier of the two — the **Hub**, they called it — and it was here that Packet arrived, windswept and uncertain.

The fortress was magnificent. But not all was well.

Deep in the eastern watchtower, the **MR44-1F** — a noble wireless herald — stood at his post *alerting*, his lantern flickering. No one knew why. The knights had noted it in the great ledger and moved on. The herald remained, flickering, unacknowledged. A portent of things to come.

And in the northern gardens, the **MT15 sensor** — a wise old monk tasked with watching the Main Office — had fallen *dormant*. Some said he simply slept. Others whispered he had gone too long without a meal. Nobody had checked.

---

## The Passage Into the Inner Kingdom

Packet was permitted through the gate and descended into **VLAN 5** — a narrow road, a bridge between worlds. This was the Meraki's gift to the land beyond: a humble uplink subnet, a dirt track leading to a greater civilisation.

At the end of that track stood the **UCG-Fiber** — the true heart of the realm, perched at its address, grand as any citadel, glowing with the light of UniFi OS.

But here Packet paused.

He realised the terrible truth of his position: *he was behind two walls*. The Meraki held the outer gate. The UCG-Fiber held the inner gate. To reach anything from the outside, a message had to pass not one guardian, but **two** — a **double NAT**, the bards called it. Functional, yes. Elegant, no. Packet made a note of this and pressed on.

---

## The Great Switching Plains

Beyond the citadel lay the **Switching Plains** — a vast, well-ordered land of copper and light.

Two great lords ruled the Plains: **CORE 1** and **CORE 2**, each a USW Pro XG 8 PoE, bound together by a sacred **LACP trunk** — a twin-link covenant that meant neither could fall without the other compensating. They were the backbone. The bedrock. Packet felt safe passing between them.

Below the lords served the **Access Knights**:
- **Access 1** and **Access 2**, the reliable Lite-16s, handling the common folk
- **Access 3** and the **DJ Desk**, the Flex 2.5G knights, PoE-armed and ready for heavier cargo

But at the edge of the plains, two posts stood **empty**.

The **Edge 1 Office** switch — once proud, now cold and dark. The **House Flex Mini** beside it — silent, unpowered, or disconnected, nobody was sure. The great ledger noted them as *offline*. Were they decommissioned warriors, or fallen ones waiting to be rescued? The kingdom had not yet sent an expedition to find out.

---

## The Lands of the Realm

The UCG-Fiber governed a **patchwork of kingdoms**, each separated by walls of VLAN and firewall rule, each with its own laws:

**INFRA** — *the native land*, home to the switches and APs themselves. The management backbone. Peaceful, unglamorous, essential.

**PROD** (VLAN 10) — *the great forge*. Here worked the **Proxmox lords** — three nodes, hammering out VMs and containers day and night. prx-prod-1 was labouring hardest, prx-prod-2 close behind. But **prx-prod-3** — prx-prod-3 sat idle. No VMs. Just RAM spinning, waiting for purpose. A soldier without a war.

The **K3s cluster** lived here too — three masters conspiring in orchestration. And deep in a modest chamber, the **Technitium DNS oracle** answered every name query in the land.

**DMZ** (VLAN 20) — *the frontier town*. One lonely resident: **Traefik**, the great herald, standing at the gate with his certificates and routing tables, waiting for all legitimate traffic from the outside world. He was the right way in. Not everyone used him.

**HOME** (VLAN 30) — *the village*. Seven trusted souls, personal devices, workstations. Peaceful.

**QUARANTINE** (VLAN 99) — *the dungeon*. No DHCP. You arrived here by being manually placed here. You did not leave easily.

**TRUSTED-IOT** (VLAN 200) — *the trusted artisans*. IoT devices allowed to speak with the inner realm, their credentials vouched for.

**UNTRUSTED-CAMERA** (VLAN 201) — *the watchers*. One camera. Allowed DNS. Allowed NTP. Allowed nothing else. It watched. It did not speak.

**UNTRUSTED-IOT** (VLAN 202) — *the foreign merchants*. Internet only. No LAN. They could sell to the outside world but could not wander the streets.

**UNTRUSTED-GUEST** (VLAN 203) — *the inn*. Visitors were welcome. They received internet. They received nothing else. They did not ask for anything else.

---

## The Wireless Towers

Above the plains rose three magnificent **U7 Pro XG** towers, singing on 2.4, 5, and 6 GHz — the full spectrum of the airwaves.

Four SSIDs rang out across the land:

- **xGREEN** — WPA3, the trusted road, open to the realm's own citizens
- **xBLUE** — the RADIUS gate, for those who could prove themselves with enterprise credentials. Not everyone could enter here. That was the point.
- **xRED** — 2.4 GHz only, WPA3 deliberately disabled, for the old and temperamental IoT devices that could not speak the new tongue. A concession to compatibility.
- **xORANGE** — a fourth road, trusted, purpose *undocumented*. The bards had not yet recorded which kingdom it led to. This troubled the scribes.

---

## The Perilous Passes — The Three Open Gates

And now we come to the dark part of the tale.

For all the wisdom of the realm's design, three **dangerous passages** had been cut through the outer walls — port forwards, left open from an earlier, less careful age.

**The First Peril: The SSH Gate (Port 22)**
A direct tunnel from the howling internet to a workstation in the HOME village. Anyone who knocked with the right key — or who was patient enough to try many keys — could reach inside. The kingdom *knew* this was wrong. It was written in the ledger: *remove via VPN*. And yet the gate remained open.

**The Second Peril: The Proxmox Gate (Port 8443)**
A window into the great forge itself. The Proxmox UI — master of all VMs, all containers, all infrastructure — reachable from the outside world on port 8443. Should this gate fall to a clever adversary, the entire realm would be theirs. *Remove via VPN*, said the ledger. The gate remained open.

**The Third Peril: The Home Assistant Gate (Port 8123)**
The oracle — **Home Assistant** — could be reached directly from the internet, bypassing Traefik entirely, arriving with no certificate, no TLS, naked as the wind. The herald Traefik stood ready in the DMZ, waiting to be used. He was not being used. *Route via Traefik*, begged the ledger.

These three gates were the realm's great unfinished business. The realm prospered despite them. It would prosper more without them.

---

## The VPN Tunnels — Paths of the Wise

Beneath the realm ran secret tunnels for those who knew them.

**WireGuard** — swift, modern, elegant. The primary path for remote travellers who needed to enter the kingdom safely. Fast as light, quiet as shadow.

**OpenVPN** — older, heavier, reliable in its age. Still running. The bards had agreed it was *legacy*. It had not yet been decommissioned. It waited patiently, hoping someone would give it a dignified retirement.

And deep in the vaults, a **permanent S2S tunnel** to the distant site hummed quietly — trusted, permanent, carrying its allowed ports across the void between realms.

---

## The Kingdom's Greatest Unspoken Danger

And then — discovered by a diligent scribe reviewing the ledger late one evening — a quiet, terrible fact:

**The UCG-Fiber's autobackup was disabled.**

The entire configuration of the gateway — every VLAN, every firewall rule, every port forward, every VPN key — existed only in the device's memory. If the UCG-Fiber ever failed, the realm would not fall to an invader. It would fall to silence. To a blank config screen. To the dull blinking of a factory-reset cursor.

The scribe wrote it down. It was the first item in the ledger.

---

## How Packet Lived Happily Ever After

Packet, having traversed the whole of the realm — from the twin Meraki gates, through the double-NAT corridor, across the great Switching Plains, through the segmented kingdoms, past the flickering herald and the dormant monk, beneath the three perilous open gates, alongside the humming VPN tunnels — finally arrived at his destination in the PROD forge.

He was processed. He was delivered. He returned home.

And as he rested, the kingdom made its vows:

The **three dangerous gates would be closed** — Proxmox and SSH behind WireGuard, Home Assistant through Traefik with a proper certificate.

The **autobackup would be enabled** before another night passed.

The **MR44-1F** would be investigated, its lantern steadied.

The **MT15** would be fed.

**prx-prod-3** would be given purpose.

The **two offline switches** would be assessed and either recommissioned or honourably retired.

**OpenVPN** would be given a dignified farewell once WireGuard carried all who needed carrying.

And **xORANGE** would finally be documented, its kingdom named, its path made clear.

The segmentation was good. The core was redundant. The APs sang on six gigahertz. The oracle of Home Assistant watched over the house.

Packet closed his eyes.

**The realm was sound. It needed only its last unfinished business seen to.**

And they all lived happily ever after — *pending the three open port forwards being closed.*

---

*The end.*
