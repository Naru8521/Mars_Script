import { Player, system } from "@minecraft/server";
import { allowlist, backup, kick, merge, reload, restart, stop, transfer } from "./libs/marsScript";

system.afterEvents.scriptEventReceive.subscribe(ev => {
    const { id, message, sourceEntity } = ev;

    if (id === "m:s") {
        if (message.startsWith("reload")) {
            reload();
        } else if (message.startsWith("stop")) {
            stop();
        } else if (message.startsWith("restart")) {
            restart();
        } else if (message.startsWith("backup")) {
            backup();
        } else if (message.startsWith("merge")) {
            merge();
        } else if (message.startsWith("transfer")) {
            const [host, portString] = message.split(" ");
            const port = parseFloat(portString);

            if (sourceEntity && sourceEntity instanceof Player) {
                transfer(sourceEntity, host, port);
            }
        } else if (message.startsWith("kick")) {
            const reason = message.split(" ")[1];

            if (sourceEntity && sourceEntity instanceof Player) {
                kick(sourceEntity, reason);
            }
        } else if (message.startsWith("allowlist")) {
            const [type, name, igLimitString] = message.split(" ");
            const igLimit = igLimitString === "true";

            if (sourceEntity && sourceEntity instanceof Player) {
                allowlist(type, name, igLimit);
            }
        }
    }
});
