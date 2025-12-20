
const FUNNY_ADJECTIVES = [
    "Clumsy", "Sneaky", "Bumbling", "Confused", "Secret", "Dramatic", "Lazy", "Hyper", "Invisible", "Wobbly",
    "Suspicious", "Giggling", "Sarcastic", "Panicked", "Dizzy", "Awkward", "Grumpy", "Sleepy", "Hungry", "Loud",
    "Whispering", "Forgetful", "Lucky", "Unlucky", "Polite", "Rude", "Fancy", "Sweaty", "Trembling", "Bold"
];

const FUNNY_NOUNS = [
    "Potato", "Ninja", "Hamster", "Spy", "Ghost", "Penguin", "Toaster", "Sock", "Pickle", "Unicorn",
    "Banana", "Chicken", "Cactus", "Muffin", "Panda", "Sloth", "Wizard", "Taco", "Noodle", "Pigeon",
    "Narwhal", "Badger", "Spoon", "Lamp", "Keyboard", "Detectie", "Agent", "Tourist", "Grandma", "Baby"
];

export function generateFunnyName(): string {
    const adj = FUNNY_ADJECTIVES[Math.floor(Math.random() * FUNNY_ADJECTIVES.length)];
    const noun = FUNNY_NOUNS[Math.floor(Math.random() * FUNNY_NOUNS.length)];
    const number = Math.floor(Math.random() * 99) + 1;
    return `${adj} ${noun} ${number}`;
}
