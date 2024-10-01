import { Player, system } from "@minecraft/server";
import { allowlist, backup, kick, merge, reload, restart, stop, transfer } from "./libs/marsScript";

system.afterEvents.scriptEventReceive.subscribe(ev => {
    const { id, message, sourceEntity } = ev;

    if (id === "m:s") {
        switch (message.startsWith()) {
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
                const host = message.split(" ")[0];
                const port = parseFloat(message.split(" ")[1]);

                if (sourceEntity && sourceEntity instanceof Player) {
                    transfer(sourceEntity, host, port);
                }
                break;

            case "kick":
                const reason = message.split(" ")[0];

                if (sourceEntity && sourceEntity instanceof Player) {
                    kick(sourceEntity, reason);
                }
                break;

            case "allowlist":
                const type = message.split(" ")[0];
                const name = message.split(" ")[1];
                const igLimit = message.split(" ")[2] === "true" ? true : false;

                if (sourceEntity && sourceEntity instanceof Player) {
                    allowlist(type, name, igLimit);
                }
                break;
        }
    }
});