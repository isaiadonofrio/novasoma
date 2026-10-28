export const INITIAL_ROUTINES = [
  {
    id: 'legs-power',
    title: 'Gambe & Glutei • Forza & Ipertrofia',
    description: 'Protocollo intensivo per arti inferiori focalizzato su quadricipiti, catena cinetica posteriore e glutei.',
    category: 'Gambe',
    durationMinutes: 65,
    difficulty: 'Intermedio / Avanzato',
    accentColor: '#10B981', // Emerald
    iconName: 'Footprints',
    exercises: [
      {
        id: 'back-squat',
        name: 'Back Squat con Bilanciere',
        subtitle: 'Re degli esercizi per gli arti inferiori',
        equipment: 'Bilanciere olimpico + Power Rack',
        targetMuscles: {
          primary: ['Quadricipiti', 'Glutei (Grande Gluteo)'],
          secondary: ['Adduttori', 'Erettori Spinali', 'Core & Addominali']
        },
        defaultSets: 4,
        defaultReps: '6 - 8',
        defaultRestSeconds: 120,
        rpe: '8 - 8.5',
        svgType: 'squat',
        execution: {
          setup: 'Posiziona il bilanciere sui trapezi (high bar) o deltoidi posteriori (low bar). Piedi poco più larghi delle spalle con punte leggermente aperte a 15-20°. Sguardo in avanti, petto fiero e addome compatto (manovra di Valsalva).',
          eccentric: 'Scendi controllando il movimento arretrando il bacino e flettendo le ginocchia contemporaneamente. Mantieni le ginocchia allineate con le punte dei piedi fino a rompere il parallelo (anca sotto la rotula).',
          concentric: 'Spingi energicamente col centro del piede e il tallone, mantenendo il busto solido fino al ritorno alla posizione eretta senza bloccare violentemente le ginocchia.',
          breathing: 'Inspira profondamente nel ventre prima di scendere, trattieni la pressione durante la buca ed espira progressivamente superato il punto critico di risalita.',
          commonMistakes: [
            'Ginocchia che collassano verso l’interno (valgismo dinamico).',
            'Talloni che si sollevano dal suolo a causa di ridotta mobilità di caviglia.',
            'Busto che si flette eccessivamente in avanti trasformando lo squat in un good-morning.'
          ],
          proTip: 'Immagina di voler "aprire il pavimento" coi piedi per attivare al massimo i glutei e stabilizzare le anche.'
        }
      },
      {
        id: 'romanian-deadlift',
        name: 'Stacco Rumeno (RDL)',
        subtitle: 'Allungamento e tensione per bicipiti femorali',
        equipment: 'Bilanciere o Coppia di Manubri',
        targetMuscles: {
          primary: ['Ischiocrurali (Femorali)', 'Glutei'],
          secondary: ['Erettori Spinali', 'Dorsali', 'Avambracci']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '7.5 - 8',
        svgType: 'rdl',
        execution: {
          setup: 'Parti in piedi con bilanciere a contatto con le cosce. Presa salda prona. Spalle depresse, scapole addotte e ginocchia leggermente sbloccate (circa 15° di flessione costante).',
          eccentric: 'Spingi il bacino indietro verso la parete posteriore ("hip hinge"). Il bilanciere scivola lungo le gambe sfiorando tibie e ginocchia finché non avverti un forte allungamento dei femorali (generalmente poco sotto il ginocchio).',
          concentric: 'Contrai con forza i glutei per riportare il bacino in avanti senza estendere la colonna lombare oltre la linea neutra.',
          breathing: 'Inspirazione diaframmatica nella fase eretta, mantieni il core sigillato in discesa, espira al termine dell’estensione dell’anca.',
          commonMistakes: [
            'Flettere la schiena perdendo la neutralità della curva lombare.',
            'Piegare eccessivamente le ginocchia facendolo diventare uno squat.',
            'Allontanare il bilanciere dal corpo aumentando la leva sul rachide.'
          ],
          proTip: 'Non pensare a scendere verso il pavimento: concentrati solo sullo spingere i glutei indietro il più possibile.'
        }
      },
      {
        id: 'bulgarian-split-squat',
        name: 'Bulgarian Split Squat',
        subtitle: 'Isolamento unilaterale per glutei e quadricipiti',
        equipment: 'Panca piana + Manubri',
        targetMuscles: {
          primary: ['Glutei', 'Quadricipiti'],
          secondary: ['Adduttori', 'Stabilizzatori dell’anca', 'Core']
        },
        defaultSets: 3,
        defaultReps: '10 - 12 per gamba',
        defaultRestSeconds: 90,
        rpe: '8',
        svgType: 'lunge',
        execution: {
          setup: 'Appoggia il collo del piede posteriore su una panca (altezza circa ginocchio). Fai un passo in avanti sufficiente affinché nella discesa la tibia anteriore sia verticale o leggermente inclinata avanti.',
          eccentric: 'Scendi verticalmente portando il ginocchio posteriore verso il suolo. Busto leggermente inclinato in avanti per caricare maggiormente il gluteo della gamba anteriore.',
          concentric: 'Spingi con decisione attraverso tutto il piede anteriore per risalire fino alla posizione di partenza.',
          breathing: 'Inspira scendendo con controllo (tempo 3 secondi), espira durante la risalita.',
          commonMistakes: [
            'Passo troppo corto che comprime l’articolazione della rotula.',
            'Scaricare troppo peso sulla gamba posteriore invece che su quella anteriore.',
            'Perdita di equilibrio dovuta a piedi posizionati su una stessa linea (mantienili su binari paralleli).'
          ],
          proTip: 'Tieni un manubrio solo sul lato opposto alla gamba che lavora per aumentare l’attivazione del gluteo medio stabilizzatore.'
        }
      },
      {
        id: 'leg-press-45',
        name: 'Leg Press a 45°',
        subtitle: 'Massimo carico e volume sui quadricipiti in sicurezza',
        equipment: 'Macchina Leg Press 45°',
        targetMuscles: {
          primary: ['Quadricipiti'],
          secondary: ['Glutei', 'Adduttori']
        },
        defaultSets: 3,
        defaultReps: '10 - 12',
        defaultRestSeconds: 90,
        rpe: '8.5',
        svgType: 'legpress',
        execution: {
          setup: 'Posiziona schiena e glutei perfettamente aderenti allo schienale. Piedi sulla pedana alla larghezza delle spalle. Rilascia i fermi di sicurezza impugnando saldamente le maniglie laterali.',
          eccentric: 'Scendi con movimento lento e controllato fino a formare un angolo di circa 90° o poco inferiore al ginocchio, senza staccare il bacino dallo schienale.',
          concentric: 'Spingi via la pedana spingendo con forza senza mai iperestendere a scatto le ginocchia a fine corsa.',
          breathing: 'Inspira all’abbassarsi del carrello, espira spingendo verso l’alto.',
          commonMistakes: [
            'Sollevare il bacino (retroversione pelvica) schiacciando la zona lombare.',
            'Bloccare le articolazioni delle ginocchia a gambe tese a fine spinta (rischio infortunio).',
            'Posizionare le mani sulle ginocchia invece di afferrare le maniglie.'
          ],
          proTip: 'Piedi più bassi sulla pedana enfatizzano i quadricipiti; piedi più alti coinvolgono maggiormente glutei e femorali.'
        }
      },
      {
        id: 'lying-leg-curl',
        name: 'Leg Curl Sdraiato (o Seduto)',
        subtitle: 'Flessione del ginocchio per picco di contrazione dei femorali',
        equipment: 'Macchina Leg Curl',
        targetMuscles: {
          primary: ['Bicipite Femorale (Semimembranoso, Semitendinoso)'],
          secondary: ['Polpacci (Gastrocnemio)']
        },
        defaultSets: 3,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8 - 9',
        svgType: 'legcurl',
        execution: {
          setup: 'Regola il cuscino imbottito affinché poggi appena sotto i polpacci (sopra il tendine d’Achille). L’asse di rotazione della macchina deve essere perfettamente allineato con l’articolazione delle ginocchia.',
          eccentric: 'Estendi le gambe in modo controllato (3 secondi) mantenendo tensione costante sui femorali senza far toccare i pacchi pesi.',
          concentric: 'Fletti le ginocchia avvicinando il rullo verso i glutei. Stringi la contrazione nel punto massimo per 1 secondo.',
          breathing: 'Espira flettendo la gamba, inspira tornando alla posizione di estensione.',
          commonMistakes: [
            'Inarcare la schiena e sollevare il bacino dal lettino per aiutarsi con l’inerzia.',
            'Eseguire il movimento troppo velocemente senza controllare la fase di discesa.'
          ],
          proTip: 'Mantieni le caviglie a martello (dorsiflessione) per disattivare parzialmente i polpacci ed esaltare i femorali.'
        }
      },
      {
        id: 'standing-calf-raise',
        name: 'Standing Calf Raise',
        subtitle: 'Sviluppo ed esplosività del gastrocnemio',
        equipment: 'Macchina per polpacci o Step + Manubrio',
        targetMuscles: {
          primary: ['Gastrocnemio', 'Soleo (Polpacci)'],
          secondary: ['Tendine d’Achille', 'Muscoli stabilizzatori del piede']
        },
        defaultSets: 4,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '9',
        svgType: 'calf',
        execution: {
          setup: 'Appoggia l’avampiede sul bordo dello step o della pedana, con i talloni liberi di scendere. Ginocchia completamente estese ma non iperestese.',
          eccentric: 'Scendi con i talloni più in basso possibile rispetto allo step, godendoti un profondo allungamento per 1-2 secondi.',
          concentric: 'Sollevati sulla punta dei piedi alla massima altezza possibile. Trattieni la massima contrazione isometrica per 2 secondi in cima.',
          breathing: 'Inspira nella fase di massimo allungamento, espira salendo in punta di piedi.',
          commonMistakes: [
            'Rimbalzare sfruttando l’elasticità del tendine invece di contrarre il muscolo.',
            'Flettere le ginocchia trasferendo il lavoro sul soleo invece del gastrocnemio.'
          ],
          proTip: 'La pausa isometrica in cima e in basso annulla il riflesso miotatico ed è il segreto per far crescere davvero i polpacci.'
        }
      }
    ]
  },
  {
    id: 'upper-push-pull',
    title: 'Upper Body • Spinta & Trazione',
    description: 'Seduta completa per la parte superiore del corpo: petto, dorso, spalle e braccia con enfasi su traiettorie corrette.',
    category: 'Parte Superiore',
    durationMinutes: 60,
    difficulty: 'Tutti i livelli',
    accentColor: '#06B6D4', // Athletic Cyan
    iconName: 'Dumbbell',
    exercises: [
      {
        id: 'bench-press',
        name: 'Panca Piana con Bilanciere',
        subtitle: 'Fondamentale per spinta toracica e tricipiti',
        equipment: 'Panca piana + Bilanciere olimpico',
        targetMuscles: {
          primary: ['Gran Pettorale'],
          secondary: ['Deltoide Anteriore', 'Tricipiti', 'Gran Dentato']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        svgType: 'bench',
        execution: {
          setup: 'Sdraiati sulla panca con occhi allineati sotto il bilanciere. Piedi piantati saldamente al suolo. Adduci e deprimi le scapole creando un arco fisiologico. Presa poco più larga delle spalle.',
          eccentric: 'Abbassa il bilanciere con traiettoria a "J" inversa verso la parte media/inferiore dello sterno. Gomiti aperti a circa 45-60° rispetto al busto.',
          concentric: 'Spingi il bilanciere verso l’alto e leggermente indietro verso la linea delle spalle, mantenendo le scapole saldamente incollate alla panca.',
          breathing: 'Inspira profondamente gonfiando la cassa toracica prima della discesa, espira superando il punto critico di risalita.',
          commonMistakes: [
            'Gomiti aperti a 90° (a croce) che provocano impingement alla cuffia dei rotatori.',
            'Rimbalzo violento del bilanciere sullo sterno.',
            'Perdita dell’assetto scapolare con spalle che avanzano in alto.'
          ],
          proTip: 'Pensa a piegare il bilanciere verso l’esterno con le mani ("spezza la sbarra") per attivare i dorsali stabilizzatori.'
        }
      },
      {
        id: 'lat-pulldown',
        name: 'Lat Machine al Petto / Trazioni',
        subtitle: 'Spessore e ampiezza del gran dorsale',
        equipment: 'Lat Machine o Sbarra Trazioni',
        targetMuscles: {
          primary: ['Gran Dorsale', 'Grande Rotondo'],
          secondary: ['Bicipiti Brachiali', 'Romboidi', 'Trapezio Medio/Inferiore']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        svgType: 'pull',
        execution: {
          setup: 'Seduto con cosce ben bloccate sotto i rulli. Presa prona poco più ampia delle spalle. Busto leggermente inclinato indietro di 10-15° con petto alto.',
          concentric: 'Inizia il movimento deprimendo le scapole, poi tira la sbarra verso la parte alta dello sterno guidando i gomiti verso il basso e indietro.',
          eccentric: 'Risali distendendo le braccia in 3 secondi fino a sentire il dorsale allungarsi completamente in cima.',
          breathing: 'Espira tirando verso il petto, inspira accompagnando il peso verso l’alto.',
          commonMistakes: [
            'Dondolare violentemente con la schiena per sfruttare l’inerzia.',
            'Tirare la sbarra dietro la nuca (sconsigliato per la salute cervicale e della spalla).'
          ],
          proTip: 'Immagina che le tue mani siano solo dei ganci e concentrati esclusivamente sul tirare giù i gomiti.'
        }
      },
      {
        id: 'overhead-press',
        name: 'Military Press / Spinte Spalle',
        subtitle: 'Forza verticale per deltoidi e stabilità del core',
        equipment: 'Bilanciere o Manubri pesanti',
        targetMuscles: {
          primary: ['Deltoidi (Anteriore e Laterale)'],
          secondary: ['Tricipiti', 'Trapezio Superiore', 'Core Addominale']
        },
        defaultSets: 3,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        svgType: 'press',
        execution: {
          setup: 'In piedi, piedi larghezza spalle, glutei e addome contratti per bloccare il bacino. Bilanciere appoggiato sulle clavicole con presa appena fuori dalle spalle.',
          concentric: 'Sposta leggermente il capo all’indietro per consentire la traiettoria verticale del bilanciere, quindi spingi sopra la testa fino al blocco articolare.',
          eccentric: 'Controlla la discesa riportando il bilanciere al petto mantenendo i gomiti leggermente avanti al bilanciere.',
          breathing: 'Inspira al petto stabilizzando il tronco, espira spingendo verso il soffitto.',
          commonMistakes: [
            'Inarcare pericolosamente la zona lombare quando il carico è troppo elevato.',
            'Gomiti che scivolano indietro durante la traiettoria.'
          ],
          proTip: 'Stringi fortissimo i glutei durante tutta la serie: crea una base solida come una roccia.'
        }
      },
      {
        id: 'cable-seated-row',
        name: 'Rematore al Cavo o con Manubrio',
        subtitle: 'Trazione orizzontale per densità scapolare',
        equipment: 'Pulley Basso o Coppia di Manubri',
        targetMuscles: {
          primary: ['Gran Dorsale', 'Romboidi', 'Trapezio Medio'],
          secondary: ['Bicipiti', 'Deltoidi Posteriori']
        },
        defaultSets: 3,
        defaultReps: '10 - 12',
        defaultRestSeconds: 75,
        rpe: '8',
        svgType: 'row',
        execution: {
          setup: 'Seduto con piedi sui supporti e ginocchia leggermente flesse. Schiena dritta con curve fisiologiche mantenute. Afferra la maniglia a V.',
          concentric: 'Tira la maniglia verso l’ombelico stringendo le scapole l’una contro l’altra per 1 secondo di contrazione di picco.',
          eccentric: 'Ritorna avanti allungando le braccia e permettendo alle scapole di aprirsi senza curvare la schiena.',
          breathing: 'Espira tirando, inspira nella fase di rilascio controllato.',
          commonMistakes: [
            'Slanciarsi all’indietro col tronco.',
            'Sollevare le spalle verso le orecchie.'
          ],
          proTip: 'Termina la tirata pensando a toccare le costole coi gomiti.'
        }
      },
      {
        id: 'lateral-raises',
        name: 'Alzate Laterali con Manubri',
        subtitle: 'Isolamento per la larghezza delle spalle',
        equipment: 'Manubri leggeri o Cavi',
        targetMuscles: {
          primary: ['Deltoide Laterale'],
          secondary: ['Trapezio Superiore', 'Sovraspinato']
        },
        defaultSets: 4,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8.5 - 9',
        svgType: 'latraise',
        execution: {
          setup: 'In piedi, manubri lungo i fianchi, busto leggermente inclinato in avanti (5-10°). Gomiti appena piegati a circa 15°.',
          concentric: 'Solleva le braccia lateralmente sul piano scapolare (leggermente avanzate rispetto alle spalle) fino all’altezza delle spalle.',
          eccentric: 'Abbassa i manubri in 2-3 secondi opponendo resistenza alla forza di gravità.',
          breathing: 'Espira sollevando i pesi, inspira abbassandoli con calma.',
          commonMistakes: [
            'Usare troppo slancio con le gambe o la schiena.',
            'Intraruotare eccessivamente le spalle (mignolo verso l’alto estremo).'
          ],
          proTip: 'Pensa a spingere i manubri verso le pareti esterne della stanza, non verso il soffitto.'
        }
      }
    ]
  },
  {
    id: 'core-mobility',
    title: 'Core, Mobilità & Condizionamento',
    description: 'Lavoro funzionale su stabilità del tronco, addominali profondi, catena posteriore e salute articolare.',
    category: 'Core & Funzionale',
    durationMinutes: 45,
    difficulty: 'Tutti i livelli',
    accentColor: '#F59E0B', // Amber
    iconName: 'Zap',
    exercises: [
      {
        id: 'deadlift',
        name: 'Stacco da Terra Tradizionale',
        subtitle: 'Massima espressione di forza di tutta la catena posteriore',
        equipment: 'Bilanciere olimpico con dischi regolamentari',
        targetMuscles: {
          primary: ['Glutei', 'Ischiocrurali', 'Erettori Spinali'],
          secondary: ['Quadricipiti', 'Dorsali', 'Trapezio', 'Core & Presa']
        },
        defaultSets: 3,
        defaultReps: '5',
        defaultRestSeconds: 150,
        rpe: '8',
        svgType: 'deadlift',
        execution: {
          setup: 'Piedi larghezza bacino con il bilanciere a metà del collo del piede (a circa 2-3 cm dalla tibia). Afferra la sbarra appena all’esterno delle gambe. Abbassa il bacino, apri il petto e attiva i dorsali tirando il "clack" del bilanciere.',
          concentric: 'Spingi via il pavimento con i piedi estendendo contemporaneamente ginocchia e anca fino a trovarti dritto con glutei serrati.',
          eccentric: 'Riporta il bilanciere a terra arretrando prima l’anca finché la sbarra non supera il ginocchio, poi piega le gambe per toccare il suolo.',
          breathing: 'Inspira profondamente creando pressione intra-addominale prima di staccare. Espira solo a stacco completato o al termine della ripetizione.',
          commonMistakes: [
            'Arrotondare la zona lombare durante lo stacco.',
            'Bilanciere che si allontana dalle tibie.',
            'Iperestendere la schiena all’indietro in chiusura.'
          ],
          proTip: 'Immagina di eseguire una leg press contro la terra invece di tirare con le braccia.'
        }
      },
      {
        id: 'hanging-leg-raise',
        name: 'Sollevamento Gambe alla Sbarra',
        subtitle: 'Forza per retto addominale e flessori d’anca',
        equipment: 'Sbarra per trazioni',
        targetMuscles: {
          primary: ['Retto dell’Addome (basso addome)', 'Ileo-Psoas'],
          secondary: ['Obliqui', 'Avambracci (Presa)']
        },
        defaultSets: 3,
        defaultReps: '10 - 12',
        defaultRestSeconds: 60,
        rpe: '8.5',
        svgType: 'core',
        execution: {
          setup: 'Appesi alla sbarra con presa salda e scapole attive (non rilassate completamente a peso morto). Gambe unite e distese.',
          concentric: 'Fletti il bacino verso l’alto sollevando le gambe (o le ginocchia se variante facilitata) arrotolando il bacino verso il costato.',
          eccentric: 'Ritorna con movimento controllato evitando che il corpo inizi a oscillare avanti e indietro.',
          breathing: 'Espira salendo e strizzando l’addome, inspira ridiscendendo con compostezza.',
          commonMistakes: [
            'Oscillare sfruttando il dondolio invece dei muscoli addominali.',
            'Muovere solo le cosce senza retroversione del bacino (lavora solo il flessore dell’anca).'
          ],
          proTip: 'Pensa ad avvicinare il pube al mento per far lavorare davvero il retto addominale.'
        }
      },
      {
        id: 'dynamic-plank',
        name: 'Plank Dinamico con Tocco Spalle',
        subtitle: 'Anti-rotazione e stabilità del corsetto addominale',
        equipment: 'Tappetino a terra',
        targetMuscles: {
          primary: ['Trasverso dell’Addome', 'Obliqui Interni ed Esterni'],
          secondary: ['Deltoidi', 'Grande Dentato', 'Glutei']
        },
        defaultSets: 3,
        defaultReps: '16 tocchi totali (8 per lato)',
        defaultRestSeconds: 60,
        rpe: '8',
        svgType: 'plank',
        execution: {
          setup: 'Posizione classica di push-up con mani sotto le spalle e piedi poco più larghi delle anche per garantire una base d’appoggio solida.',
          concentric: 'Solleva lentamente una mano per toccare la spalla opposta, resistendo con il core per impedire al bacino di ruotare o basculare.',
          eccentric: 'Riposiziona la mano a terra con delicatezza e ripeti con l’altro braccio.',
          breathing: 'Respira in modo fluido e cadenzato, non trattenere il fiato.',
          commonMistakes: [
            'Oscillare e sculettare con i fianchi da una parte all’altra.',
            'Bacino che sprofonda verso il basso o si alza troppo a piramide.'
          ],
          proTip: 'Immagina di avere una tazzina di caffè bollente appoggiata sulla parte bassa della schiena che non devi assolutamente rovesciare.'
        }
      }
    ]
  }
];

export const MUSCLE_GROUPS = [
  'Tutti',
  'Quadricipiti',
  'Glutei',
  'Ischiocrurali',
  'Pettorali',
  'Dorsali',
  'Spalle',
  'Core',
  'Polpacci'
];
