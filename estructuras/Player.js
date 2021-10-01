const { Structure } = require("erela.js");

module.exports = Structure.extend(
    "Player",
    (Player) =>
        class extends Player {
            constructor(...args) {
                super(...args);
                this.speed = 1;
                this.pitch = 1;
                this.rate = 1;
                this.nightcore = false;
                this.vaporwave = false;
                this.bassboost = false;
                this.distortion = false;
                this.eightd = false;
                this.karaoke = false;
                this.vibrato = false;
                this.tremolo = false;
            }
            setSpeed(speed) {
                if (isNaN(speed)) {
                    throw new RangeError("Player#setSpeed() Speed must be a number.");
                }
                this.speed = Math.max(Math.min(speed, 5), 0.05);
                this.setTimescale(speed);
                return this;
            }

            setFilter(body = {}) {
                this.node.send({
                    op: "filters",
                    guildId: this.guild.id || this.guild,
                    ...body
                });
                return this;
            }

            setPitch(pitch) {
                if (isNaN(pitch)) {
                    throw new RangeError("Player#setPitch() Pitch must be a number.");
                }
                this.pitch = Math.max(Math.min(pitch, 5), 0.05);
                this.setTimescale(this.speed, pitch);
                return this;
            }

            setEightD(eightdd) {
                if (typeof eightdd !== "boolean") {
                    throw new RangeError(
                        'Player#setEightD() EightD can only be "true" or "false".'
                    );
                }

                this.eightd = eightdd;
                if (eightdd) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.bassboost = false;
                    this.distortion = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.node.send({
                        op: "filters",
                        guildId: this.guild.id || this.guild,
                        rotation: {
                            rotationHz: 0.3
                        }
                    });
                } else {
                    this.clearEffects();
                }
                console.log(this);
                return this;
            }

            setKaraoke(karaok) {
                if (typeof karaok !== "boolean") {
                    throw new RangeError(
                        'Player#setKaraoke() Karaoke can only be "true" or "false".'
                    );
                }

                this.karaoke = karaok;
                if (karaok) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.bassboost = false;
                    this.distortion = false;
                    this.eightd = false;
                    this.tremolo = false;
                    this.node.send({
                        op: "filters",
                        guildId: this.guild.id || this.guild,
                        karaoke: {
                            level: 1.0,
                            //monoLevel: 1.0,
                            filterBand: 220.0,
                            filterWidth: 100.0
                        }
                    });
                } else {
                    this.clearEffects();
                }
                return this;
            }

            setVibrato(vib) {
                if (typeof vib !== "boolean") {
                    throw new RangeError(
                        'Player#setVibrato() Vibrato can only be "true" or "false".'
                    );
                }

                this.vibrato = vib;
                if (vib) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.bassboost = false;
                    this.distortion = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.node.send({
                        op: "filters",
                        guildId: this.guild.id || this.guild,
                        vibrato: {
                            frequency: 10,
                            depth: 0.9
                        }
                    });
                } else {
                    this.clearEffects();
                }
                return this;
            }

            setTremolo(trem) {
                if (typeof trem !== "boolean") {
                    throw new RangeError(
                        'Player#setVibrato() Tremolo can only be "true" or "false".'
                    );
                }

                this.tremolo = trem;
                if (trem) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.bassboost = false;
                    this.distortion = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.vibrato = false;
                    this.node.send({
                        op: "filters",
                        guildId: this.guild.id || this.guild,
                        tremolo: {
                            frequency: 10,
                            depth: 0.5
                        }
                    });
                } else {
                    this.clearEffects();
                }
                return this;
            }

            setNightcore(nighcore) {
                if (typeof nighcore !== "boolean") {
                    throw new RangeError(
                        'Player#setNighcore() Nightcore can only be "true" or "false".'
                    );
                }

                this.nightcore = nighcore;
                if (nighcore) {
                    this.bassboost = false;
                    this.distortion = false;
                    this.vaporwave = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.vibrato = false;
                    this.setVaporwave(false);
                    this.setBassboost(false);
                    this.setDistortion(false);
                    this.setTimescale(1.2999999523162842, 1.2999999523162842, 1);
                } else {
                    this.setTimescale(1, 1, 1);
                }
                return this;
            }

            setVaporwave(vaporwave) {
                if (typeof vaporwave !== "boolean") {
                    throw new RangeError(
                        'Player#setVaporwave() Vaporwave can only be "true" or "false".'
                    );
                }

                this.vaporwave = vaporwave;
                if (vaporwave) {
                    this.nightcore = false;
                    this.bassboost = false;
                    this.distortion = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.vibrato = false;
                    this.setBassboost(false);
                    this.setNightcore(false);
                    this.setDistortion(false);
                    this.setTimescale(0.8500000238418579, 0.800000011920929, 1);
                } else {
                    this.setTimescale(1, 1, 1);
                }
                return this;
            }

            setDistortion(distortion) {
                if (typeof distortion !== "boolean") {
                    throw new RangeError(
                        'Player#setDistortion() Distortion can only be "true" or "false"'
                    );
                }

                this.distortion = distortion;
                if (distortion) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.bassboost = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.vibrato = false;
                    this.setBassboost(false);
                    this.setNightcore(false);
                    this.setVaporwave(false);
                    this.setDistort(0.5);
                } else {
                    this.clearEffects();
                }
                return this;
            }

            setBassboost(bassboost) {
                if (typeof bassboost !== "boolean") {
                    throw new RangeError(
                        'Player#setBassboost() Bassboost can only be "true" or "false".'
                    );
                }

                this.bassboost = bassboost;
                if (bassboost) {
                    this.nightcore = false;
                    this.vaporwave = false;
                    this.eightd = false;
                    this.karaoke = false;
                    this.tremolo = false;
                    this.vibrato = false;
                    this.setVaporwave(false);
                    this.setNightcore(false);
                    this.setEqualizer(1, 0.85);
                } else {
                    this.clearEffects();
                }
                return this;
            }

            setDistort(value) {
                this.value = value || this.value;

                this.node.send({
                    op: "filters",
                    guildId: this.guild,
                    distortion: {
                        distortion: this.value
                    }
                });
                return this;
            }

            setEqualizer(band, gain) {
                this.band = band || this.band;
                this.gain = gain || this.gain;

                this.node.send({
                    op: "filters",
                    guildId: this.guild,
                    equalizer: [
                        {
                            band: this.band,
                            gain: this.gain
                        },
                        {
                            band: this.band,
                            gain: this.gain
                        },
                        {
                            band: this.band,
                            gain: this.gain
                        },
                        {
                            band: this.band,
                            gain: this.gain
                        },
                        {
                            band: this.band,
                            gain: this.gain
                        },
                        {
                            band: this.band,
                            gain: this.gain
                        }
                    ]
                });
                return this;
            }

            setTimescale(speed, pitch, rate) {
                this.speed = speed || this.speed;
                this.pitch = pitch || this.pitch;
                this.rate = rate || this.rate;

                this.node.send({
                    op: "filters",
                    guildId: this.guild,
                    timescale: {
                        speed: this.speed,
                        pitch: this.pitch,
                        rate: this.rate
                    }
                });
                return this;
            }
            clearEffects() {
                this.speed = 1;
                this.pitch = 1;
                this.rate = 1;
                this.nightcore = false;
                this.vaporwave = false;
                this.bassboost = false;
                this.distortion = false;
                this.eightd = false;
                this.karaoke = false;
                this.vibrato = false;
                this.tremolo = false;
                this.clearEQ();

                this.node.send({
                    op: "filters",
                    guildId: this.guild
                });
                return this;
            }
            setNowplayingMessage(message) {
                if (this.nowPlayingMessage)
                    this.nowPlayingMessage.delete().catch(() => {
                        return;
                    });
                return (this.nowPlayingMessage = message);
            }
        }
);
