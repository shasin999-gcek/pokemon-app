export enum BASE_STAT {
    HP = "hp",
    ATTACK = "attack",
    DEFENSE = "defense",
    SPECIAL_ATTACK = "special-attack",
    SPECIAL_DEFENSE = "special-defense",
    SPEED = "speed"
}

export const StatColorMap = {
    [BASE_STAT.HP]: "primary",
    [BASE_STAT.ATTACK]: "danger",
    [BASE_STAT.DEFENSE]: "success",
    [BASE_STAT.SPECIAL_ATTACK]: "warning",
    [BASE_STAT.SPECIAL_DEFENSE]: "warning",
    [BASE_STAT.SPEED]: "info",
}
