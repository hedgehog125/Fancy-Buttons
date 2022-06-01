<script>
    import {applyClasses} from "../lib/tools.js";

    /*
    TODO

    Is modifying the element directly the best way of doing this? Especially with multiple click effects

    Create a default style without a transition so that can be applied with a class. Remove the clicked class, add this new class and then remove it and add the new one back. Or might have to manually change the values without the class applied so no transition
    Handle multiple touches
    Fix bug involving shrinking from click making mouse not touch
    Detect spam click and massively slow down the reverse click animation on release when it's true. Maybe just have multiple tint overlays and keep the button the same size?
    Alpha effect is too big with distance. Maybe use the square root thing?
    */
    

    const hoverStartTime = 0.25 * 1000;
    const clickStartTime = 0.15 * 1000;
    const releaseEarlyDelay = 0.15 * 1000;
    const reboundTime = 0.15 * 1000;

    const CIRCLE_TO_SQUARE = Math.SQRT1_2;

    let hoverTask, clickTask, releaseEarlyTask, reboundTask;
    let hovering = false;
    let clicking = false;
    let spamClicking = false;

    let tint;

    let display = {
        hovering: false,
        clicking: false,
        rebound: false
    };

    const endHover = _ => {
        display.hovering = false;
    };

    const enter = _ => {
        if (reboundTask != null) return;

        if (hoverTask == null) clearTimeout(hoverTask);

        hoverTask = setTimeout(_ => {
            if (! hovering) endHover();

            hoverTask = null;
        }, hoverStartTime);
        hovering = true;
        display.hovering = true;
    };
    const leave = _ => {
        if (reboundTask != null) return;

        if (hoverTask == null) endHover();

        hovering = false;
    };

    const endClick = _ => {
        display.clicking = false;
        display.rebound = true;
        tint.style.transform = "";

        reboundTask = setTimeout(_ => {
            display.rebound = false;

            reboundTask = null;
        }, reboundTime);
    };

    const clickStart = e => {
        if (reboundTask != null) { // Interupt the animation
            display.rebound = false;

            clearTimeout(reboundTask);
            reboundTask = null;
        }
        

        let rect = e.target.getBoundingClientRect();

        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY  - rect.top) / rect.height) * 100;

        display.clicking = true;
        
        let squareSize = (Math.max(Math.abs(x - 50), Math.abs(y - 50)) / 50) + 1.05;
        let scale = squareSize / CIRCLE_TO_SQUARE;

        tint.style.left = (x - 50) + "%";
        tint.style.top = (y - 50) + "%";
        tint.style.transform = `scale(${scale})`;


        if (releaseEarlyTask != null) {
            endClick();

            clearTimeout(releaseEarlyTask);
            releaseEarlyTask = null;
        }

        if (clickTask == null) {
            clickTask = setTimeout(_ => {
                clickTask = null;

                if (! clicking) {
                    releaseEarlyTask = setTimeout(_ => {
                        endClick();

                        releaseEarlyTask = null;
                    }, releaseEarlyDelay);
                }
            }, clickStartTime);
        }
        clicking = true;
    };
    const clickEnd = _ => {
        if (reboundTask != null) return;

        if (spamClicking) {
            if (clickTask) clearTimeout(clickTask);
            if (releaseEarlyTask) clearTimeout(releaseEarlyTask);

            clickTask = null;
            releaseEarlyTask = null;
        }
        if (clickTask == null && releaseEarlyTask == null) endClick();

        clicking = false;
    };
</script>

<main>
    <div class="center">
        <button class={
            applyClasses(
                ["large", "hovering", "clicking", "rebound"],
                [true, display.hovering, display.clicking, display.rebound]
            )
        } on:mouseenter={enter} on:mouseleave={leave} on:mousedown={clickStart} on:mouseup={clickEnd}>
            <div class="content">Hmm</div>
            <div bind:this={tint} class="tint"></div>
        </button>
    </div>
</main>

<style>
    button {
        border-radius: 50%;
        border-width: 3px;
        border-color: rgba(0, 0, 0, 0);

        aspect-ratio: 1;
        font-weight: bold;
        background-color: lime;
        padding: 0px;

        position: relative;
        overflow: hidden;
        user-select: none;

        transition-property: filter, border, transform;
        transition-duration: 0.25s;
        transition-timing-function: ease-in-out;
    }

    button > .content {
        position: relative;
        top: 0%;

        padding: 25px;
    }

    button > .tint {
        position: absolute;
        top: 0px;
        left: 50%;
        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;

        transform: scale(0);

        transition-property: transform, background-color;
    }

    button.hovering {
        transform: scale(1.025);
        border-color: rgba(0, 0, 0, 0.2);

        transition-duration: 0.25s;
        filter: brightness(0.94);
    }

    button.hovering > .tint {
        transition-duration: 0.25s;
        transition-timing-function: ease-in;
    }

    button.clicking {
        transform: scale(1);

        transition-duration: 0.15s;
        transition-timing-function: ease-in;
    }

    button.clicking > .tint {
        transform: scale(1);

        transition-duration: 0.15s;
        transition-timing-function: ease-out;
    }

    button.rebound {
        transform: scale(1.04);

        transition-duration: 0.15s;
        transition-timing-function: ease-out;
    }

    button.rebound > .tint {
        background-color: rgba(0, 0, 0, 0);
    }

    .large {
        font-size: 100px;
    }

    .center {
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);
    }
</style>