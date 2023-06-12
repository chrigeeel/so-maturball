import { useEffect, useState } from "react";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        klasse: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("Anmelden");

    useEffect(() => {
        console.log(formData);
        if (formData.name.length < 3) {
            setDisabled(true);
            return;
        }
        if (formData.klasse.length < 1) {
            setDisabled(true);
            return;
        }
        setDisabled(false);
    }, [formData]);

    const submit = async () => {
        let data = {
            fields: {
                ...formData,
            },
        };

        const response = await fetch(
            "https://api.airtable.com/v0/appkKpjaZT0U3qMP6/tblX7yead7Mvts0B4",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer keyc5RQTxIPryoK0f`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        try {
            const data = await response.json();
            console.log(data);
            setMessage("Erfolgreich angemeldet!");
        } catch (err) {
            console.log(err);
            setMessage("Error!");
        }
    };

    return (
        <div className="h-screen w-screen flex relative">
            <div className="absolute top-0 left-0 h-full w-full">
                <img
                    className="h-full w-full object-cover"
                    src="https://so-rychenberg.ch/static/media/dj.ff14f2f50a31aa361bd6.jpg"
                    alt=""
                />
            </div>
            <div className="flex bg-neutral-900 bg-opacity-10 absolute top-0 left-0 h-full w-full backdrop-blur-sm z-10">
                <div className="m-auto flex flex-col w-11/12 max-w-lg bg-neutral-900 shadow-xl rounded-md p-4">
                    {message ? (
                        <span className="text-white font-bold text-xl text-center">
                            {message}
                        </span>
                    ) : (
                        <>
                            <span className="text-white font-bold text-xl underline">
                                Anmeldung Maturball
                            </span>
                            <div className="flex flex-row mt-2 gap-2">
                                <div className="flex flex-col flex-grow">
                                    <span className="text-neutral-400 font-semibold text-sm">
                                        Name
                                    </span>
                                    <input
                                        className="bg-neutral-800 rounded-md outline-none p-2 text-white font-semibold"
                                        type="text"
                                        onChange={(e) => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                name: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <span className="text-neutral-400 font-semibold text-sm">
                                        Klasse
                                    </span>
                                    <input
                                        className="bg-neutral-800 rounded-md outline-none p-2 text-white font-semibold"
                                        type="text"
                                        onChange={(e) => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                klasse: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row mt-6">
                                <div className="flex flex-col flex-grow">
                                    <span className="text-neutral-400 font-semibold text-sm">
                                        Name Begleitung (optional)
                                    </span>
                                    <input
                                        className="bg-neutral-800 rounded-md outline-none p-2 text-white font-semibold"
                                        type="text"
                                        onChange={(e) => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                begleitung: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mt-6">
                                <button
                                    onClick={async () => {
                                        setButtonText("...");
                                        try {
                                            await submit();
                                        } finally {
                                            setButtonText("Anmelden");
                                        }
                                    }}
                                    disabled={disabled || buttonText === "..."}
                                    className={`w-full rounded-md h-12 transition ${
                                        disabled
                                            ? "bg-neutral-500"
                                            : "bg-emerald-500"
                                    }`}
                                >
                                    <span className="text-center font-bold text-white text-lg">
                                        {buttonText}
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
