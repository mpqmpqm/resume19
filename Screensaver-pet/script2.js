function cascade (lineCount) {

    strokeSwitch ();

    for (i = 1; i < lineCount; i++) {
        setTimeout(strokeSwitch, lineCount*10 - i*10);
    }

}

