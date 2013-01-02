var Audio =
{
    plugin : null,
    init: function (){
        var success = true;
        this.plugin = document.getElementById("pluginAudio");
        if(!this.plugin){
            success = false;
        }
        return success;
    },
    setRelativeVolume: function(delta){
        this.plugin.SetVolumeWithKey(delta);
        //Display.setVolume(this.getVolume())
    },
    getVolume: function() {
        return this.plugin.GetVolume();
    }
}

Audio.init = function()
{
    var success = true;
    
    this.plugin = document.getElementById("pluginAudio");
    
    if (!this.plugin)
    {
        success = false;
    }

    return success;
}

Audio.setRelativeVolume = function(delta)
{
    this.plugin.SetVolumeWithKey(delta);
    //Display.setVolume( this.getVolume() );

}

Audio.getVolume = function()
{
    return this.plugin.GetVolume();
}
