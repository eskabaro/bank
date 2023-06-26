export const AvatarUutils = {
    setAvatar(): string {
        const avatars = [
            '/animals/crab-3969778.png',
            '/animals/elephant-3969722.png',
            '/animals/frog-3969785.png',
            '/animals/lion-3969803.png',
            '/animals/mouse-3969805.png',
            '/animals/panda-3969735.png',
            '/animals/pig-3969799.png',
            '/animals/rabbit-3969777.png',
            '/animals/snake-3969724.png',
            '/animals/walrus-3969761.png'
        ]
        const randomIndex = Math.floor(Math.random() * avatars.length)
        return avatars[randomIndex]
    }
}