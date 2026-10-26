import react from "react";
import { useState } from "react";
import "./Summary.css";

export default function Summary() {
    const [summary, setSummary] = useState("");
    return (
        <div className="summary">
            <h1>Summary</h1>
            <p>
                The feedback analysis tool is a web application that allows users to
                analyze feedback data and generate insights. It provides a user-friendly
                interface for uploading feedback files, selecting analysis options, and
                viewing the results. The tool uses advanced algorithms to process the
                feedback data and generate meaningful summaries and visualizations.
            </p>
        </div>
    )
}