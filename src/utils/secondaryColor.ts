function lightenColor(primaryColor: string, percent: number = 20) {
    // Validate input
    if (!primaryColor || !/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(primaryColor)) {
        console.error("Invalid primary color format");
        return null;
    }

    // Validate percent
    percent = percent || 20;
    if (isNaN(percent) || percent < 0 || percent > 100) {
        console.error("Invalid percentage value");
        return null;
    }

    // Convert hex to RGB
    let r = parseInt(primaryColor.slice(1, 3), 16);
    let g = parseInt(primaryColor.slice(3, 5), 16);
    let b = parseInt(primaryColor.slice(5, 7), 16);

    // Calculate new RGB values for lighter color
    r = Math.min(255, r + (255 - r) * (percent / 100));
    g = Math.min(255, g + (255 - g) * (percent / 100));
    b = Math.min(255, b + (255 - b) * (percent / 100));

    // Convert back to hex
    const secondaryColor = `#${Math.round(r).toString(16)}${Math.round(g).toString(16)}${Math.round(b).toString(16)}`;

    return secondaryColor;
}