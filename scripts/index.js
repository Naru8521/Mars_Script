import { world } from "@minecraft/server";
import { allowlist, backup, kick, merge, reload, restart, stop, transfer } from "./libs/marsScript";

world.beforeEvents.chatSend.subscribe(ev => {
    const { sender, message } = ev;

    switch (message) {
        case "reload":
            reload();
            break;

        case "stop":
            stop();
            break;

        case "restart":
            restart();
            break;

        case "backup":
            backup();
            break;

        case "merge":
            merge();
            break;

        case "transfer":
            transfer(sender, "127.0.0.1", 19132);
            break;

        case "kick":
            kick(sender, "test");
            break;

        case "allowlist":
            allowlist("add", "Steve", false);
            break;
    }
});