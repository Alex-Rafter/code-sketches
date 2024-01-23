import { returnSocialsObj } from "../../shared/return-socials-obj.js";

export const bskHeaderTopSocials = {
    facebook: null,
    twitter: null,
    linkedin: null,
    youtube: null,
    instagram: null,
    socials: [],
    init(el) {
        const self = this;
        returnSocialsObj(self)
    },
};
