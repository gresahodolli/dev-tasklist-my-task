"use client";

const BackButton = () => {
    const handleBack = () => {
        window.history.back(); // Kthehet një hap mbrapa në historinë e shfletuesit
    };

    return <button onClick={handleBack}>Back</button>;
};

export default BackButton;
