<template>
  <div class="flex flex-col gap-1">
    <div class="flex justify-center items-center w-full text-sm gap-5">
      <span
        >Developed with
        <i class="i-tabler:heart-filled text-lg color-red-500" /> by Anton Combe
        (a.k.a MooNoKe/Suniver).</span
      >
      <NuxtLink
        external
        target="_blank"
        href="https://discord.com/invite/DeJutYKHuP"
        class="flex items-center gap-1"
        ><i class="i-tabler:brand-discord-filled text-lg" /> Join Dustland
        Delivery Discord</NuxtLink
      >
      <NuxtLink
        external
        target="_blank"
        href="https://store.steampowered.com/app/2943280/Dustland_Delivery/"
        class="flex items-center gap-1"
        ><i class="i-tabler:brand-steam text-lg" />Dustland Delivery Steam
        Page</NuxtLink
      >
      <NuxtLink
        external
        target="_blank"
        href="https://steamcommunity.com/sharedfiles/filedetails/?id=3309660636"
        class="flex items-center gap-1"
        ><i class="i-tabler:file-type-doc text-lg" /> Documentation /
        Help</NuxtLink
      >
    </div>
    <div class="flex justify-center items-center w-full text-sm">
      Dustland Delivery is the exclusive property of Neutron Star Studio and
      Farlight Games. The developer of this application holds no rights and is
      in no way affiliated with Neutron Star Studio or Farlight Games.
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
a {
  color: #1c1917;
  text-decoration: none;
}

a:hover {
  color: #57534e;
}
</style>
