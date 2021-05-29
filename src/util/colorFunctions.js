const enhanceColor = (normalized) => {
    if (normalized > 0.04045) {
        return ((normalized + 0.055) / (1.0 + 0.055)) ** 2.4
    }
    else {
        return normalized / 12.92
    }
}

export const RGBtoXY = (r, g, b) => {
    var rNorm = r / 255.0
    var gNorm = g / 255.0
    var bNorm = b / 255.0

    var rFinal = enhanceColor(rNorm)
    var gFinal = enhanceColor(gNorm)
    var bFinal = enhanceColor(bNorm)

    var X = rFinal * 0.649926 + gFinal * 0.103455 + bFinal * 0.197109
    var Y = rFinal * 0.234327 + gFinal * 0.743075 + bFinal * 0.022598
    var Z = rFinal * 0.000000 + gFinal * 0.053077 + bFinal * 1.035763

    if (X + Y + Z === 0) {
        return (0, 0)
    }
    else {
        var xFinal = X / (X + Y + Z)
        var yFinal = Y / (X + Y + Z)
    }

    return [xFinal, yFinal]
}


export const getGradientColor = (start_color, end_color, percent) => {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (start_color.length === 3) {
        start_color = start_color.replace(/(.)/g, '$1$1');
    }

    if (end_color.length === 3) {
        end_color = end_color.replace(/(.)/g, '$1$1');
    }

    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);

    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);

    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;

    diff_red = ((diff_red * percent) + start_red).toString(16).split('.')[0];
    diff_green = ((diff_green * percent) + start_green).toString(16).split('.')[0];
    diff_blue = ((diff_blue * percent) + start_blue).toString(16).split('.')[0];

    // ensure 2 digits by color
    if (diff_red.length === 1) diff_red = '0' + diff_red
    if (diff_green.length === 1) diff_green = '0' + diff_green
    if (diff_blue.length === 1) diff_blue = '0' + diff_blue

    return '#' + diff_red + diff_green + diff_blue;
};

export const hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
