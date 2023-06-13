function generateReactionList(setReactionAmount, list) {
    var like = 0;
    var love = 0;
    var haha = 0;
    var wow = 0;
    var sad = 0;
    var angry = 0;
    if (list) {
        for (let i = 0; i < list.length; i++) {
            switch (list[i].reactType) {
                case 'like':
                    like++;
                    break;
                case 'love':
                    love++;
                    break;
                case 'haha':
                    haha++;
                    break;
                case 'wow':
                    wow++;
                    break;
                case 'sad':
                    sad++;
                    break;
                case 'angry':
                    angry++;
                    break;
                default:
            }
        }
        setReactionAmount([
            { type: 'like', count: like },
            { type: 'love', count: love },
            { type: 'haha', count: haha },
            { type: 'wow', count: wow },
            { type: 'sad', count: sad },
            { type: 'angry', count: angry },
        ]);
        // reactionAmount.push({ type: 'like', count: like });
        // reactionAmount.push({ type: 'love', count: love });
        // reactionAmount.push({ type: 'haha', count: haha });
        // reactionAmount.push({ type: 'wow', count: wow });
        // reactionAmount.push({ type: 'sad', count: sad });
        // reactionAmount.push({ type: 'angry', count: angry });
    }
}

export default generateReactionList;
