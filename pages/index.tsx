import styles from '@/styles/Home.module.css'
import surferImg from "../public/Images/surfer.png";
import InteractionButton from "../components/InteractionButton";
import { DotCursor } from "TouchFree/src/Cursors/DotCursor";
import TouchFree from "TouchFree/src/TouchFree";
import {
  InputType,
  TouchFreeInputAction,
  InteractionType,
  HandChirality
} from "TouchFree/src/TouchFreeToolingTypes";
import { useEffect, useRef, useState } from "react";

const colors: string[] = [
  "#D2386C",
  "#B55A30",
  "#E9897E",
  "#FDAC53",
  "#F5DF4D",
  "#A0DAA9",
  "#00A170",
  "#9BB7D4",
  "#0072B5",
  "#926AA6",
];

let initialized = false;
let lastData = {};

export default function Home() {
  const [progressToClick, setProgressToClick] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("lightgray");

  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      console.log('Component initialized');
    }

    TouchFree.Init({ initialiseCursor: false });
    addTouchFreeCursor();

    const inputHandler = TouchFree.RegisterEventCallback(
      "TransmitInputAction",
      handleTFInput
    );

    return () => {
      inputHandler.UnregisterEventCallback();
    };
  }, []);

  const handleTFInput = (evt: TouchFreeInputAction): void => {
    const inputAction = evt.InputType;
    // DOWN input has a bug where it sends ProgressToClick of 0 so ignore this for now
    if (inputAction !== InputType.DOWN) {
      const prog = evt.ProgressToClick;
      setProgressToClick(prog ? prog : 0);
    }

    // should listen for MOVE action ( found from TouchFree/TF_Tooling_Web/src/Cursors/DotCursor.ts line 95 function HandleInputAction() ) and send the data
    let interactionType = '';
    if(evt.InteractionType == InteractionType.GRAB) {
      interactionType = 'grab';
    } else if(evt.InteractionType == InteractionType.HOVER) {
      interactionType = 'hover';
    } else if(evt.InteractionType == InteractionType.PUSH) {
      interactionType = 'push';
    } else if(evt.InteractionType == InteractionType.TOUCHPLANE) {
      interactionType = 'touchplane';
    } else if(evt.InteractionType == InteractionType.VELOCITYSWIPE) {
      interactionType = 'velocityswipe';
    }
    
    let inputType;
    if (inputAction !== InputType.NONE) {
      inputType = 'none';
    } else if (inputAction !== InputType.CANCEL) {
      inputType = 'cancel';
    } else if (inputAction !== InputType.DOWN) {
      inputType = 'down';
    } else if (inputAction !== InputType.MOVE) {
      inputType = 'move';
    } else if (inputAction !== InputType.UP) {
      inputType = 'up';
    }

    const data = {
      x: Math.round(evt.CursorPosition[0]),
      y: Math.round(evt.CursorPosition[1]),
      width: window.innerWidth,
      heigth: window.innerHeight,
      gesture: interactionType,
      inputType,
      hand: evt.Chirality == HandChirality.LEFT ? 'left': 'right',
      distanceFromScreen: Math.round(evt.DistanceFromScreen * 100)
    }

    if (JSON.stringify(data) != JSON.stringify(lastData)) {
      lastData = data;
      console.log(data);
      sendData(data);
    }
  };

  const addTouchFreeCursor = (): void => {
    const createCursor = (size: number, zIndex: string): HTMLImageElement => {
      const c = document.createElement("img");
      c.src = surferImg.src;
      c.style.position = "absolute";
      c.width = size;
      c.height = size;
      c.style.zIndex = zIndex;
      c.style.pointerEvents = "none";
      // This is a special class used by the WebInputController to identify the html elements that
      // make up the cursor. This is so it can ignore cursor-related objects when it is looking
      // for elements to pointerover/pointerout etc.
      c.classList.add("touchfreecursor");
      return c;
    };

    const cursor = createCursor(80, "1002");
    const cursorRing = createCursor(100, "1001");

    if (appRef.current) {
      appRef.current.appendChild(cursor);
      appRef.current.appendChild(cursorRing);
    }

    new DotCursor(cursor, cursorRing);
  };

  async function sendData(data: any) {
    // console.log('Sending data');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pinCode: '123456',
            data
        })
    };
    const ret = await fetch(
        '/api/senddata',
        options
    );
    const out = await ret.json();
    console.log(out);
  }

  return (
    <div className={styles.center} ref={appRef} style={{ backgroundColor }}>
      <div className={styles.container}>
        {colors.slice(0, 4).map((color, index) => {
          return (
            <InteractionButton
              key={index}
              progressToClick={progressToClick}
              setBackgroundColor={setBackgroundColor}
              color={color}
            />
          );
        })}
      </div>
      <div className={styles.container}>
        {colors.slice(4, 8).map((color, index) => {
          return (
            <InteractionButton
              key={index}
              progressToClick={progressToClick}
              setBackgroundColor={setBackgroundColor}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
}
