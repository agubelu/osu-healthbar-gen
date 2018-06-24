import mergeImages from 'merge-images'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

const _ = x => document.getElementById(x);

function generateDownloadZip(filename) {
    let layers = [];

    layers.push(_("id-canvas-layer-1").toDataURL()); // BG
    layers.push(_("id-canvas-layer-3").toDataURL()); // Border
    layers.push(_("id-canvas-layer-4").toDataURL()); // Flag
    layers.push(_("id-canvas-layer-5").toDataURL()); // Text
    try {
        // Those two may not exist if the avatar is set to none
        layers.push(_("id-canvas-layer-6").toDataURL()); // Avatar
        layers.push(_("id-canvas-layer-7").toDataURL()); // Avatar border
    } catch(err) {}

    mergeImages(layers)
               .then(b64 => {
                   afterImagesMerged(b64, filename);
               });
}

function afterImagesMerged(dataUriBg, filename) {
    let scorebarBg2x = atob(dataUriBg.substr(22));
    let dataUriFg = _("id-canvas-layer-0").toDataURL();
    let scorebarColor2x = atob(dataUriFg.substr(22));

    // Create the sized-down versions
    let canvas = document.createElement('canvas');
    canvas.width = 677;
    canvas.height = 80;
    let ctx = canvas.getContext('2d');

    // This is ugly but im too lazy
    let img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let scorebarBg = atob(canvas.toDataURL().substr(22));
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let img2 = new Image();
        img2.onload = function() {
            ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
            let scorebarColor = atob(canvas.toDataURL().substr(22));

            let zip = new JSZip();
            zip.file("scorebar-bg@2x.png", scorebarBg2x, {binary: true});
            zip.file("scorebar-colour@2x.png", scorebarColor2x, {binary: true});
            zip.file("scorebar-bg.png", scorebarBg, {binary: true});
            zip.file("scorebar-colour.png", scorebarColor, {binary: true});

            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    FileSaver.saveAs(content, filename + ".zip");
                });
        }

        img2.src = dataUriFg
    };

    img.src = dataUriBg;
}

export { generateDownloadZip };