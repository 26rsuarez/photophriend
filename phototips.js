var photoTips = [
    "Keep a dog treat handy to draw a dog's attention for great photos of an attentive, furry friend!",
    "In landscape photography, you'll want a high f/stop to make sure everything is in focus.",
    "A tripod is advisable anytime you are dropping the shutter speed below 1/60th of a second",
    "Stars move!  Keep the shutter speed at a max of 30 seconds to keep them crystal clear for night sky photos.",
    "Stars move!  Want proof?  Try out a long exposure shot. (Some cameras will let you go as high as 30 minutes!)",
    "Shooting a portrait?  Put the top of the subject's head about a third away from the top of the photo.",
    "Rule of thirds: frame a photo to where changes in action, shadow, or subject happens in 1/3 intervals for engaging photos.",
    "Shooting a portrait?  Set your focus point on the eyes.",
    "Shooting a portrait?  Keep that f/stop low for a beautifully blurred background.  But watch your focus!",
    "Shooting an action shot?  Crank the shutter speed up to freeze the action",
    "Shooting an action shot?  Drop the shutter speed down to create a motion blur effect.",
    "A high ISO will let you shoot in low light, but the photo will be noisier (think of your phone's camera in low light).",
    "A low ISO creates a very sharp photo, but it requires more light or longer shutter speeds.",
    "The f/stop controls how much light the lens lets in.  Think of it like a pupil.  Low number is like a dialated pupil.",
    "The lower the f/stop, the more background blur.  A high f/stop will keep the entire scene in focus.",
    "File type matters!  Use RAW if you plan on editing your photos.",
    "Clouds are your friend!  They act as a giant diffuser and spread light evenly across your subject.",
    "Uncooperative subject (like a dog or baby)?  Continuous shutter lets you shoot in bursts.",
    "Shooting a portrait?  Avoid wide angled lenses.  They can stretch facial features in uncompromising ways at a close distance."

];

//button click
$("button").on("click", function () {
    var random = photoTips[Math.floor(Math.random() * (photoTips.length - 1))]
    console.log(random)
    $("#fact-text").html(random);


})

