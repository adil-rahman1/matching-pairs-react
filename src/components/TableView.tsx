import { useState } from "react";
import { CardObj, generateGameCards } from "../util/generateGameCards";
import { CardView } from "./CardView";
import "./TableView.css";

const emojiList: string[] =
    "🐵 🦧 🐶 🐕 🐩 🐺 🦊 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🦬 🐮 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐨 🐼 🦥 🦘 🦡 🦃 🐔 🐤 🐥 🐧 🕊️ 🦅 🦆 🦢 🦉 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🦕 🦖 🐳 🐬 🦭 🐠 🐡 🦈 🐙 🐚 🐌 🦋 🐛 🐜 🐝 🐞 🦗 🕷️ 🦂 🦞 🦐 🦑 ⛄".split(
        " "
    );
const gameCards: CardObj[] = generateGameCards(emojiList);

export function TableView(): JSX.Element {
    type TurnPhaseType =
        | { phase: "noneTurned" }
        | { phase: "oneTurned"; cardOneId: string }
        | { phase: "twoTurned"; cardOneId: string; cardTwoId: string };

    const [turnPhase, setTurnPhase] = useState<TurnPhaseType>({
        phase: "noneTurned",
    });
    const [totalClicks, setTotalClicks] = useState<number>(0);

    const allCardViews = gameCards.map((card: CardObj) => (
        <CardView
            key={card.id}
            card={card}
            onCardClick={() => handleClick(card.id)}
        />
    ));

    function handleClick(cardId: string) {
        switch (turnPhase.phase) {
            case "noneTurned":
                // flip card
                setTurnPhase({ phase: "oneTurned", cardOneId: cardId });
                console.log("turnPhase before click:", turnPhase);
                setTotalClicks((prev) => prev + 1);
                break;
            case "oneTurned":
                // flip card
                setTurnPhase({
                    ...turnPhase,
                    phase: "twoTurned",
                    cardTwoId: cardId,
                });
                console.log("turnPhase before click:", turnPhase);

                setTotalClicks((prev) => prev + 1);
                break;
            case "twoTurned":
                // alert(
                //     "Are the gameCards a match?" +
                //         turnPhase.cardOneId +
                //         turnPhase.cardTwoId
                // );
                // unflip both flipped gameCards if unmatched else remove from table

                setTurnPhase({ phase: "noneTurned" });
                console.log("turnPhase before click:", turnPhase);

                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="game-table">
                <div className="grid-container">{allCardViews}</div>
                <p>{`Turn Status: ${turnPhase.phase}`}</p>
                <p>{`Click count: ${totalClicks}`}</p>
            </div>
        </>
    );
}
