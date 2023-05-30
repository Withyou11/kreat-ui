function generateReactionList(reactionAmount, list) {
    var like = 0;
    var love = 0;
    var haha = 0;
    var wow = 0;
    var sad = 0;
    var angry = 0;
    if (list) {
        for (let i = 0; i < list.length; i++) {
            switch (list[i].reactType) {
                case 'Like':
                    like++;
                    break;
                case 'Love':
                    love++;
                    break;
                case 'Haha':
                    haha++;
                    break;
                case 'Wow':
                    wow++;
                    break;
                case 'Sad':
                    sad++;
                    break;
                case 'Angry':
                    angry++;
                    break;
                default:
            }
        }
        reactionAmount.push({ type: 'like', count: like });
        reactionAmount.push({ type: 'love', count: love });
        reactionAmount.push({ type: 'haha', count: haha });
        reactionAmount.push({ type: 'wow', count: wow });
        reactionAmount.push({ type: 'sad', count: sad });
        reactionAmount.push({ type: 'angry', count: angry });
    }
}

export default generateReactionList;
