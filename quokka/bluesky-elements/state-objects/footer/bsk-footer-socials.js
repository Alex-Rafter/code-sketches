import { returnSocialsObj } from "../../shared/return-socials-obj.js";

export const bskFooterSocials = {
    facebook: null,
    twitter: null,
    linkedin: null,
    youtube: null,
    instagram: null,
    logoColour: null,
    socials: [],
    init(el) {
        const self = this;
        returnSocialsObj(self)
    },
}