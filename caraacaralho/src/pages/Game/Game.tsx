import React, { useEffect, useState } from 'react'
const image_link = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEhIVFRUVFRUVFxUVFRUVFRUVFRUWFhUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHR0tLS0rLS0tLS0rLS0rLS0tLSstLS0tLS0tLS0tLS0rKy0tKy0tLSstLS0tLS0tLS0tK//AABEIAN8A4gMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xABCEAABAwICCAMECAQDCQAAAAABAAIRAwQhMQUSQVFhcYGRBiKhEzKx8AcUI0JSwdHhYoKS8RWisiQlMzRTY3ODwv/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgICAgIDAAAAAAAAAAABAhEDIRIxE0EEIhRRYf/aAAwDAQACEQMRAD8AoEqRCyS6CEBKiSJUiVSFBSgrhKE0O0IRCgKlhIEIFQkSoBIhBQCIQhAQlhCEBCIG5CVAkBEIQgEqRKgEiEIEQhCBqEQklLKBUJEIBCEKwF0FyllQOwlXEoL4xOSgdpVT19MyS2iA6M3kwxvM7VErV3kEvfJ2NGDRxI28sVKF9UuGNwLmg7pE9k19ep/jHr+iztB5Putzzc6fQAfFS6Nm534BuGBPQYk9lXadLynWa7JzT1/VPexdsaeioRQdTP3p5ED4ytBYHWAnA8CRGe3NRbfpMkNhKpdVwJIcXS0QC4NMjg4Y90z9Wzg47AfnBJkXEylC5nYUhKsh2hchKgUpEIQKhIEsoApEShAISIQMhCAhAqEIQIiUqIUoAShJkoN3cuDS4ENGzDE/vwRKVcXAaM/2/UrM6TvjUOrrGM4G3gB8XHomdMXbm/Z60u+/jlOIbz2nsq6gZIBMDaT+fAblOhZ0Jj8LW44bzu48VGOu8gNAA2TmeW0pu6uA90NkMbgAcXHe47JO7Ynre4Iwa045nEuPM5xwy4KCJ1MCl7xk7hHb99is9HaRqOGRDdzQ8TzdtVVRpuOwCOkD0hWlvdsbgC1x/hI+IxVKtFp9mI1w+fwtBnqZwUmja0yCWBzebDH+USoRfUjClIziZ9C4cV1Z3gB80jg5gaPXH1VZta6T69wWACQQNoGMdTJ6hOWVRjp94SDDoBP8wnDA7V3ePY5sgty44/5Y9VSXV9ALPOI90kzHIbAl7WibeXDGiZHw5GZI7wmLW6ZUnVOI2HAqiq3j3CHEOA/qE58YUUVS0yCZGzcd37K2MUyjXpJTFnce0YHbdvNOqyjpC5lEoOkLmUsoFQVzKQlTodShcSlU6DaVcoVR0hIEqBQhIlQJUOHb4hZ+6vwS5wGDA4gcRMfAKw03d6lOAcTt3AAn8lmg/XZU2E6xgb2hrj6FymCoNQmTMkmSeJx6qxs7UwAdsTvOOSgUaRngFqtH23lxx25cEzy0nDHatdZwdnFPCgDEt9fmVc/UmkzCkDRB2A8s/gsLzR0ThtUbKUZNPdvpgYUmlrD3R3eSOwACuKWiHbAZ5fou/wDCHA7ucT+qr8qf49QbUVCZls7fMzrtKtbdr5xIPIu44YOj0RS0BUdi1rjxhzQOroU+l4auYBPs3DdMmObmz6qLyRb4MkStSdBh7Y3EAdsW/BUWlrhzYDhA2GBqnvPxWkutH1WYElvEa0f1NcY6rOXOiajyQ10k/dLm+Y7hLtX1VpyS/amXFlFayvJxEjdjhvjcubiAdaMMAY2t/I7j0S1bJ1F+pWaaeP3mub1x2cRKtf8ACK2HlL2ES2oBrASd+1u8K/nNqeF0b0PW1XFkyDEHfhgequiqS6sHW9QAiBPl4Y+Zs7QHYg7WuaroLRjQkSpEAlSIUgQhEpsCEkoTYbSrlKCiCpVylUJKgnahcVjh2+KDNeILqXimM4JPM4eghVQuQ2QM5B7YEdQSjSFXWruPGPTH1TFXzGdpOPP+0K+lUm3aAIG8HpvWt0ORgCJlZKmzV1d09pOS1Fm+A1Y8ro4b209KwaTl6lWdrblh8pHUSQoOjny0Harm33rhr0cdHqVrr+8A7mPgp9C01TDWx2TVC4ZTEucOuCn2mk6biII248sCidumW5Kk0LBpzPbJNG4Ekg4HHDkq3SWl3UwdQYwceOzuraUuTRvoMaPNEcYyWY0xfWgkBjSdpEfJWL01pC4rOLab6h2F2sQOgnAJjRlvTY6bi7bOZY0h7upU+M0xtv01VvpG1uh7J4a5sYBwIA5Ti3mpd7o1lKiadNoAAJaNiSwZZVR9nqPj70y7vKmOaANQYjZmcNyp69L3udvNdKVvaMx99nwHlOPCQD/Ku7Z8tB4LrStuWPMj3pAn5xGBHNoXFoIbG5ehi87I6hCSVKCoSIQKuZSykQEIQhA0lSJUQVKkCUokKPevhsqQomlDFJ5/hKIYonWdPMqbRtC4EjEjzRvgYjtKgNbn0VloqtquEzu/JWpCXLAwxnj3+cFcaLqzhvnpCrtN0dWo0jIjPfGf5d037QgQDH7qmU3GmN1Wnr6bdSAbTjmfnAJk+JaxIaHxxMD8sFW0KDYaXy4uIAE4Y71JrWftAXUGAMYQ11U5axyDR6rOYTfptc7r2XSOl6kjWdMbzjyzhJZ+JnMdtjn8yrXwh4YpXpd5WVC2kXkVGvaZa6HMLiQWuxmcQmvEfhqkKD6tBrqbqYl1N2Pl4PBg/FRnjjLqmFyynlGq0HpgVWtxw4q10jqvbIzhedeHapbSmYW20Rc6zVz2adWH7RCdYe0AEYH7uQdz4b1G0/Sq2dQUadSo0ao/4TAGaxDSB5RMGXeZ2Hk4rXU3gCAIHBNXDDVI12seB7pcwOI7q3HlJ7inLhbNS6Zu+0TWa+hUD9b2jWv1yGh4mZY4iNduEiROS1uj6bsNbMbcpCZ9gS4OcdaMp3xCl06gbOCzy7q0lk0w+mx56rTseS3o5pcOxae6rw2FdeI4NQk/eIcOgLT6GOqpn5rt4/Tg5ZrIkpEShXUCEIUBUQhEoEhKhCBkJVyEoUhQgoQgExpBs0nj+E/BPris2WuG8EeiDFMpzPRJVBaJG/4iEj8HFvH1XTfNhv8Ak+qtSLD666rTaHAEyDxBjOe4PRPU9HOfAA4rmxoAMyxLp7ALS6EeGuGGYWOeem3HhtXXtiNRgEh0nHLZBgb1b+Hr7VYaItzBwc0mWc8cVZ1rCnUyziBwTthYOp7Rzwn4Ln+SumcSfo37FpAYGa8SAS5zuZOznkudPu+wdTIxeIIGwHBSWODMhJPqo+kGinTc55kkT+iru29tPGSajEsZ7Py91tfDbWEY7u53LBX+lm0QXuEl2QUDRvjF7HjynVnfK1mFym2XyTG6e0VqbdSQQCNi4triR5Y5fosFpDTVzVpO+rML34DCDqzmYOcfmpPgupcgOFYuLh+LPkq5YdbXxz3WzqXJByUepcyCpVrcU6oh2B37VBvbbVkg9lWRdQaWfDgTiASSDu1T+irnV/at141TOqR0wKuLymHAkiY2cCCO6ra9u2mx0feqT0hb4X1HJy4+6ioSBKtnMEIQoAlSJUAhIlQMBKEIVqBCEKAIQhBkdP2+pWJjB2I5xj6qJbslwM7fVafSvsHjVqHIzhMjqqyra09X7Nx+d6i5zS0wqRZPBVk2pq4hUNK5iRtmT2VnRdrNlYZYujjy+mmsK5iZVgLw5BZ3R1aBCn0qiysdONaawI944lQ9PN9r5TuM9klnX2Jb13HEhJE5Vi63h6o8w7Uc0ZEzMcktHwc50EQANow3/otLbmKkTIEdXYwO47BTHXIAzGImD1HxaMeK1lscuWWNvSNo6wbQGq2ZGZ2nYZ6x3CsbeoGEkZzjv6qJcX7Z1yTO4DYfeHPcor78Al0ga2YJGB1Tl1AOCaTMrPpaXtw2ddhj8W7n+q7Ze62BVZV0tSeQCYLw2DBgk7OG0JNHgvgg7XDdMR0yPpKrcdL4cu+qk1XA6w4eqqtInBnXuMCrGm3F5Iyw4cR8FXXhlokZO+P9lrxseaoYXQXIXS1c4QhCBUq5SoBCEIGAlQkRBUIQiQkdklQgpLu3I2KLUt3Aaze29aUAZOGCiGzGsWSIIlvEbVhdx1Y2ZRmqIDjIGIgwd42TxVpQdqiI754RjHVN17D2JJElx2Dd+q6sntcWiYxGfMbOyvO4plPG7Wlo+W8f1Txr6rgDlnKiglsQMz1ymI5n0Uu5pB7QRmBsx2nNY2NcculxaXAiZUe5vWkmoT5WnuGxl3KjaKMCHDEZjgACfnimtL2TxEA4zgMIEN+RwU4zSuee0G608NUtJ82eGc7AN/vHJSbK2vbzENDG7C/cTOA3KHorRdNh1nNk4Yn4rW2N5m0YDVw4GCrWz6MMde3NLwo8ia1y47wyGz1MnalqeELYNJ+1nf7R54b1Z0apeJDhl02BOgloM8ZjkqtNsfdeHnUwXsqOdH3XQTBMQHCN6svDVxLXNcfdEgbid23EgiOSsLh0ggjA4HgNmajW9hDjq7SI5yO2UdQtMf8AWOftJrM8pjbjxmIPKQGnoq3SBgfzfm6fnirWnVwc0mSB8Id8CVU6VEYD8RPKZkd/irY+2ed3EIJUgSq7MIQhAJUiEAhCEDSRKhAIQhAIQhAJuswkYYEGQdx/QpxKlm0y67ivrX7w4F1IiMyMRzlVV+2HGqyYkTA2HgtI5u79lDvWmHgUzDo93JZeNl6bfJMp2iUK8Frj/CexGMd1cW1RgOcSBhMwIP6rMmtEg5ZkbRMa0T1Ui3uYIk4wBPKQ08iFa4qY1o3kiC3aSDEGCJjpkOStKjvaU4iQJE72kSOmJ7Kho3IMN/FOO4xh38w7KVbXJGEmYgz8fVVuO070cpW06xIgCI5J00C0YDL8vkpaLyBqnaROO7PHqnKlWcRvjmDn3kdlS4NMeQWF0WiB87iVMuLrVAzg5j4qnuHlm2STlG6Z+eCWpdnVM8MeEQT3TxX89rK0ra0iTIy2ZGYPzvUylV1dYHMxE7sBqk9BjniFUaNuxnu29Seu0dVJr1QXQXCcRnvwIPoVpIwyuzlZ2q5xzjCd+J/tHBVt4/Wdy/v+aeq3JJIIkuzjftkbcioZU4+0ZegEIQrswhCEAhCECIQhA2hAQpqAhCVQkiVASoEQlSgIALoJEqCj05ZEH2jctqqWlbCo0EEHIrGiu0vcG5BxA4ic1FWlT7W5OG8DPjvVsyrJBPLvP7KhYpra53qrRfU3mJxw/L5KBcD1Pqqq0viHGTIPp8yVyx07fn5+KVSTtcV6gcJEYd9iiVjtnmNx3z0TFOS75nvyVhRtcZKrcovjjUWgXQGxAGOXbDqVYU6c4xiTjx+fzT9G1lWNG13BZ3kaTi7c6LtGs1qjhMDbtA2dsFQeJ6B0feGk0l1Go1tWjP8A0qkw2d4II6BbFtLVpuGZh3eCmvpo0DqWNpXA81tqUXn+B7QP9bW/1LT8e272r+TNaZWjVDhIyTioNG3eqQTkYB/IrQBa2ac5EJSkCAQhCAQhCBoIRCUBAIRCAgAlSgIhAALpCEAhCh32k6VEedwn8IxceinSDPiC+9jROPmd5W9cz0Cy3h6mHvew7WSOYITGk9IOrv13cmjY0bk3oyuaVRr9kweRzVpOhba5aS12YS+2V6/RDrkD2bS52whV9fQNWi4NrMczdIIB5HIrO4tMbtxb1Qc1aWzARgnrCwpxEYqVaWEPI2FY5V0Y8d9olvU80K/taMqDd2Go4FW1kRAWWVbY4f2kUaAlT2MjAJimJUxjZiBJMADeTgAs99ttSdrTw3o41qokeVkOd0yHU/ArUeK9ENvLWrbvyqMLeRzaehAKk6E0eLekG/eOLjvJ/IZKZWGC7+LDxjyufk88nykLR1PWpvHmY5zTzaYT1ppR1PykSBlOY6rSfSNa+y0hWAyfqVP6mifUFY24ZBlb3HbNet0s05gj1Uhl9TOTh1wWapujknXNVfjGoa4HIoKyocRtT9K5eMnHuo+NO2iQqT/EKm/0CFHhTa5ASwlCVVS51ULopIRBQhMXF2yn77gOuPZVF34iAwptni7AdlOti8c4DEmBvKrLzTtNmDfOeGXdZy5vKlU+dxPDZ2TMK8xNpt/petUEB2oNzc++apxbk4z+6lOK7ptwU6QimhCShgcVLc1MakFND0j6OtIgeWfM2I4tXrVvXpXDPZ1qbXNOYcAQf3Xzloq9dRc2o3Np7jaDzXtPh3SrK7GvYZBHUHaDxCrYmOtK+AAJqWbv/S8/6Hn4Hus4y0cx+q4Frhm1wgjovU9H3EqTf6LpXI+0aCRk4YOHI/ksM+Lfp08fN4+3l15b6wy2KDSaQYW0014dqUQXNOuzfHmbzG7isy+nBmFyXG49V3YZ45TcPWrlr/COjNd3tnDytJDBvdkXdMu6zGhbP6xWFMGBm50gGNw3kr1GzoNpsaxogNEAcAt+Dj3+1c/5XNJPGJCbq5JxcOC7HmvC/pbb/vAj/tU//pYOsFv/AKZGlt+CNtGmfV4WDq4j5wV5VkYBOtKb+dycYVYcOXQXRCECpVyhBp0ExmoGktKNo4RLiJA2RvJWdub+pV944bhgOy55Np2v7rTNNs6vnPDLv+iqLnStV+3VG5uHrmoTV3qrWYxBl7ZXHs1Ka356JHhW0I4YlhOELhygM1N28p9rUy33h1+CkIOXBNEJ5IWyg5puharwPpr2FXUcfJU8s/hefddy2HpuWTT1JKPoSxuywwVprO8DhmvO/A+kvrlqC/GpTPs3k/egS107yIniCtTbuLMFnpZK8YeJBYW7qobr1D5abPxOO04jADE/uvFq2maVeoX16VxTc4kl1Ku9mPBrtZnSQE/9LPix5vjQFOm5lBjW/aM1jrvaHuIMggQWD+VZ3Rfiai7yXFtAOGvbvLXD+SoXNPoo8dkysegaFr1GguoVBfUwJfQqNFK7Y3fAwqjiJW50P4ztTSDm1HFoID2Pn2lGcPMNw7bsoPlF1YmhTZdUamvSLop1WzTqMeNhacQeIJBTB0n9aeK8Blem4MrFg1W3FJ4I1nNyDw4AHYZB2KdIvb6PpvDgCDIIkEZEbCul519FunnEGzqEnVaX0jnDAYcwnhII5xsC9FRR4r9Nbf8AbKR30B6PevO3DcvSvpw/5mh/4T/rK82atMfSUer8/O5c03Yp+qo8KyUlyZCfpnBR61cawaOqDtKm9ZCD/9k=';


import "./Game.css"
import useWebSocket from 'react-use-websocket';
import { useGlobalContext } from '../../context/UserContext';


export const Game = () => {

    const { copy } = useGlobalContext()

    const WS_URL = `ws://127.0.0.1:8000`
    const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
        share: true,
        queryParams: { username: copy }
    })

    const [flipped, setFlipped] = useState(Array(25).fill(false));
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);


    const [cards, setCards] = useState(
        Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,  // Adiciona um ID único para cada card
            name: `Bolsolula ${index + 1}`,  // Define o nome como o ID do card
            image: image_link,  // Substitua 'image_link' pelo seu link de imagem
            flipped: true
        }))
    );


    const handleFlip = (index: number) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);

        // Alterar o card específico
        const newCards = [...cards];
        newCards[index] = {
            id: newCards[index].id,
            flipped: !newCards[index].flipped,
            name: newCards[index].name,
            image: newCards[index].image,
        };
        setCards(newCards);

        // Contar cards que estão virados (flipped = false)
        const countFlippedFalse = newCards.filter(card => !card.flipped).length;

        // Enviar a contagem via WebSocket
        sendJsonMessage({
            flippedCards: countFlippedFalse
        });
    };


    useEffect(() => {

        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));

            const data = JSON.parse(lastMessage.data);

            // Pegar o último objeto no JSON recebido
            const keys = Object.keys(data);
            const lastKey = keys[0];
            const antonioData = data[lastKey];

            if (antonioData ) {
                console.log('Estado do Antonio:', antonioData.state);
            }
        }
    }, [lastMessage]);

    return (
        <>
            <h1>CARA A CARALHO</h1>

            <p>Seu adversário flipou 5 cartas!</p>

            <div className="game-board">


                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        {card.flipped
                            ? <img src={card.image} className="card-image" alt={card.name} />
                            : <img src={""} className="card-image" />
                        }
                        <div className="card-content">
                            <h2 className="card-name">{card.flipped ? card.name : "CARA A CARALHO"}</h2>
                        </div>

                        <button onClick={() => handleFlip(index)}>
                            virar
                        </button>
                    </div>
                ))}
            </div>


        </>

    )
}
