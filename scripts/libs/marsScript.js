import { Player } from "@minecraft/server";

/**
 * @param {string} name 
 * @param {any} contents 
 */
function send(name, contents = {}) {
    const json = JSON.stringify({ name, contents });
    console.log(`MARS:SCRIPT_COMMAND:${json}`);
}

/**
 * サーバーのリロードを行います。
 */
export function reload() {
    send("reload");
}

/**
 * サーバーを停止します。
 */
export function stop() {
    send("stop");
}

/**
 * サーバーを再起動します。
 */
export function restart() {
    send("restart");
}

/**
 * サーバーのバックアップを行います。
 */
export function backup() {
    send("backup");
}

/**
 * サーバーをマージします。
 */
export function merge() {
    send("merge");
}

/**
 * プレイヤーを特定のサーバーに転送します。
 * @param {Player} player 
 * @param {string} host 
 * @param {number} port
 */
export function transfer(player, host, port) {
    if (!(player instanceof Player)) return;
    if (typeof host !== "string") return;
    if (typeof port !== "number") return;

    send("transfer", { player: player.name, host, port });
}

/**
 * プレイヤーを理由と共にキックします。
 * @param {Player} player 
 * @param {string?} reason 
 */
export function kick(player, reason = "") {
    if (!(player instanceof Player)) return;
    if (typeof reason !== "string") return;

    send("kick", { player, reason });
}

/**
 * ホワイトリストの追加や削除を行います。
 * @param {"add" | "remove"} type 
 * @param {string} name 
 * @param {boolean?} igLimit 
 */
export function allowlist(type, name, igLimit = false) {
    if (type !== "add" && type !== "remove") return;
    if (typeof name !== "string") return;
    if (typeof igLimit !== "boolean") return;

    send("allowlist", { type, name, igLimit });
}
