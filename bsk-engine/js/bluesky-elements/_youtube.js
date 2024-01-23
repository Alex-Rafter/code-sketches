const YTPlayer = require("yt-player");

window.ytInitMain = function () {
    setTimeout(() => {
        const ytPlayersElemenmts = document.getElementsByClassName("ytplayer");
        const ytPlayers = {};
        let isCurrentlyPlaying = false;

        if (ytPlayersElemenmts.length > 0) {
            Array.from(ytPlayersElemenmts).forEach((el) => {
                const youtubeId = el.dataset.youtubeId;
                const autoplay = el.dataset.youtubeAutoplay === "true";

                const player = new YTPlayer(el, {
                    controls: 0,
                    autoplay,
                    related: false,
                    modestBranding: true,
                });

                player.mute();

                player.load(youtubeId, autoplay);

                // Loop
                player.on("ended", () => {
                    player.play();
                });

                player.on("playing", () => {
                    isCurrentlyPlaying = true;
                });

                player.on("paused", () => {
                    isCurrentlyPlaying = false;
                });

                ytPlayers[youtubeId] = player;
            });

            toggleMuteUI();
        }

        /**
         * Get player object from ytPlayers array.
         *
         * @param {string} frameID The data-youtube-id attribute of the DOM el.
         * @return {object} Specific ytPlayers object.
         */
        function getPlayerObject(frameID) {
            return ytPlayers[frameID];
        }

        /**
         * Play video by ID.
         *
         * @param {*} frameID The data-youtube-id attr of the DOM el.
         * @return {void}
         */
        function playVideoByID(frameID) {
            const player = getPlayerObject(frameID); // player object
            player.play();
        }

        function isVideoPlaying(frameID) {
            const player = getPlayerObject(frameID);
            return isCurrentlyPlaying;
        }

        /**
         * Pause video by ID.
         *
         * @param {*} frameID The data-youtube-id attr of the DOM el.
         * @return {void}
         */
        function pauseVideoByID(frameID) {
            const player = getPlayerObject(frameID); // player object
            player.pause();
        }

        /**
         * Mute video by ID.
         *
         * @param {*} frameID The data-youtube-id attr of the DOM el.
         * @return {void}
         */
        function muteVideoByID(frameID) {
            const player = getPlayerObject(frameID); // player object
            player.mute();
        }

        /**
         * Unmute video by ID.
         *
         * @param {*} frameID The data-youtube-id attr of the DOM el.
         * @return {void}
         */
        function unmuteVideoByID(frameID) {
            const player = getPlayerObject(frameID); // player object
            player.unMute();
        }

        /**
         * Toggle mute video by ID.
         *
         * @param {*} frameID The data-youtube-id attr of the DOM el.
         * @return {void}
         */
        function toggleMuteVideoByID(frameID) {
            const player = getPlayerObject(frameID); // player object
            if (player.isMuted()) {
                player.unMute();
            } else {
                player.mute();
            }
        }

        /**
         * Use with HTML elements with data attribute: 'data-ytplayer-mute-id'.
         * This function takes the value of the 'data-ytplayer-mute-id'
         * data attribute and uses it to mute/unmute the associated YouTube player.
         * It also sets a data attribute 'ytplayer-is-muted' to true/false depending
         * on player object api method isMuted() response.
         *
         * @return {void}
         */
        function toggleMuteUI() {
            const muteToggleButtons = document.querySelectorAll(
                "[data-ytplayer-mute-id]"
            );

            if (muteToggleButtons.length) {
                muteToggleButtons.forEach((element) => {
                    element.dataset.ytplayerIsMuted = getPlayerObject(
                        element.dataset.ytplayerMuteId
                    ).isMuted()
                        ? "false"
                        : "true";

                    element.addEventListener("click", (event) => {
                        toggleMuteVideoByID(
                            event.target.dataset.ytplayerMuteId
                        );
                        event.target.dataset.ytplayerIsMuted = getPlayerObject(
                            event.target.dataset.ytplayerMuteId
                        ).isMuted()
                            ? "false"
                            : "true";
                    });
                });
            }
        }

        function sliderYouTubeHandlerNext(
            event,
            slick,
            currentSlide,
            nextSlide
        ) {
            const currentSlickSlide = slick.$slides[currentSlide];
            const nextSlickSlide = slick.$slides[nextSlide];

            const currentSlideIframeID = $(currentSlickSlide)
                .find("iframe")
                .attr("id");
            const nextSlideIframeID = $(nextSlickSlide)
                .find("iframe")
                .attr("id");

            const currentHasIframe =
                $(currentSlickSlide).find("iframe").length > 0 ? true : false;
            const nextHasIframe =
                $(nextSlickSlide).find("iframe").length > 0 ? true : false;

            if (currentHasIframe) {
                pauseVideoByID(currentSlideIframeID);
            }
            if (nextHasIframe) {
                playVideoByID(nextSlideIframeID);
            }
        }

        function sliderYouTubeHandlerLoad(
            event,
            slick,
            currentSlide,
            nextSlide
        ) {
            var currentSlide = slick.$slides[currentSlide];
            var currentHasIframe =
                $(currentSlide).find("iframe").length > 0 ? true : false;

            if (currentHasIframe) {
                playVideoByID(currentHasIframe);
                console.log("current has iframe");
            }
        }

        /**
         * Call sliderYouTubeHandlerNext on
         * slick slider beforeChange.
         */
        $(".slider").on("beforeChange", sliderYouTubeHandlerNext);

        /**
         * Call sliderYouTubeHandlerLoad on
         * slick slider on init.
         */
        $(".slider").on("init", sliderYouTubeHandlerLoad);

        window.isVideoPlaying = isVideoPlaying;
    }, 0);
};

// window.ytInitMain();
