function returnSocialsObj(self) {

    const socialsPropsKeys = [
        "facebook",
        "twitter",
        "linkedin",
        "youtube",
        "instagram",
    ];

    const arrOfSocialsObjs = Object.keys(self)
        .filter(
            (prop) => self[prop] !== null && socialsPropsKeys.includes(prop)
        )
        .map((prop) => {
            return {
                name: prop,
                link: self[prop],
            };
        });

    self.socials.splice(0, self.socials.length, ...arrOfSocialsObjs);

}


export { returnSocialsObj };