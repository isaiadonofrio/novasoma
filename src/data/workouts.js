export const INITIAL_ROUTINES = [
  {
    id: 'legs-power',
    title: 'GAMBE & GLUTEI • FORZA & IPERTROFIA',
    shortTitle: 'Gambe & Glutei',
    description: 'Protocollo intensivo per gli arti inferiori focalizzato su quadricipiti, catena cinetica posteriore e glutei.',
    category: 'Gambe',
    durationMinutes: 65,
    difficulty: 'Intermedio / Avanzato',
    accentColor: '#D9A184', // GymMane Clay
    exercises: [
      {
        id: 'back-squat',
        name: 'Back Squat con Bilanciere',
        subtitle: 'Il re degli esercizi per gli arti inferiori',
        equipment: 'Bilanciere + Power Rack',
        muscleKey: 'quads',
        secondaryKeys: ['glutes', 'calves', 'abdomen'],
        illustration: '/ex/quads.webp',
        targetMuscles: {
          primary: ['Quadricipiti', 'Glutei (Grande Gluteo)'],
          secondary: ['Adduttori', 'Erettori Spinali', 'Core']
        },
        defaultSets: 4,
        defaultReps: '6 - 8',
        defaultRestSeconds: 120,
        rpe: '8 - 8.5',
        lastRecord: '100kg × 8',
        execution: {
          setup: 'Posiziona il bilanciere sui trapezi. Piedi poco più larghi delle spalle con punte aperte a 15-20°. Petto fiero e addome compatto.',
          eccentric: 'Scendi arretrando il bacino e flettendo le ginocchia simultaneamente. Mantieni le ginocchia allineate con le punte dei piedi fino a rompere il parallelo.',
          concentric: 'Spingi attraverso il centro del piede e il tallone, mantenendo il busto solido fino al ritorno alla posizione eretta.',
          breathing: 'Inspira nel ventre prima di scendere (manovra di Valsalva), espira superato il punto critico di risalita.',
          commonMistakes: [
            'Ginocchia che collassano all’interno (valgismo dinamico).',
            'Talloni che si sollevano da terra.',
            'Busto che si piega eccessivamente in avanti.'
          ],
          proTip: 'Immagina di voler "allargare il pavimento" con i piedi per massimizzare la tensione sui glutei.'
        }
      },
      {
        id: 'romanian-deadlift',
        name: 'Stacco Rumeno (RDL)',
        subtitle: 'Allungamento e tensione meccanica sui femorali',
        equipment: 'Bilanciere olimpico o Manubri',
        muscleKey: 'hamstrings',
        secondaryKeys: ['glutes', 'back'],
        illustration: '/ex/hamstrings.webp',
        targetMuscles: {
          primary: ['Ischiocrurali (Femorali)', 'Glutei'],
          secondary: ['Erettori Spinali', 'Dorsali', 'Avambracci']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        lastRecord: '85kg × 10',
        execution: {
          setup: 'Parti in piedi con bilanciere a contatto con le cosce. Ginocchia leggermente sbloccate con angolo fisso a 15°.',
          eccentric: 'Spingi il bacino indietro verso la parete posteriore ("hip hinge"). Il bilanciere scivola aderente alle gambe fin sotto il ginocchio.',
          concentric: 'Contrai con decisione i glutei per riportare il bacino avanti senza iperestendere la zona lombare.',
          breathing: 'Inspira e blocca il core prima della discesa, espira al termine dell’estensione d’anca.',
          commonMistakes: [
            'Incurvare la colonna vertebrale.',
            'Piegare troppo le ginocchia trasformandolo in uno squat.',
            'Allontanare il bilanciere dalle gambe.'
          ],
          proTip: 'Non pensare a scendere verso il pavimento: concentrati unicamente sullo spingere il bacino all’indietro.'
        }
      },
      {
        id: 'bulgarian-split-squat',
        name: 'Bulgarian Split Squat',
        subtitle: 'Lavoro unilaterale di stabilità e ipertrofia glutei',
        equipment: 'Panca piana + Coppia di Manubri',
        muscleKey: 'glutes',
        secondaryKeys: ['quads'],
        illustration: '/ex/glutes.webp',
        targetMuscles: {
          primary: ['Glutei', 'Quadricipiti'],
          secondary: ['Adduttori', 'Stabilizzatori dell’anca']
        },
        defaultSets: 3,
        defaultReps: '10 - 12 per lato',
        defaultRestSeconds: 90,
        rpe: '8',
        lastRecord: '24kg × 10',
        execution: {
          setup: 'Appoggia il dorso del piede posteriore sulla panca. Fai un passo avanti in modo che la tibia anteriore resti quasi verticale.',
          eccentric: 'Scendi controllando il movimento portando il ginocchio posteriore verso il pavimento con busto leggermente inclinato avanti.',
          concentric: 'Spingi con tutto il piede anteriore per risalire alla posizione iniziale.',
          breathing: 'Inspira scendendo in 3 secondi, espira spingendo in risalita.',
          commonMistakes: [
            'Passo troppo corto che sovraccarica il ginocchio.',
            'Scaricare il peso sulla gamba posteriore anziché su quella anteriore.'
          ],
          proTip: 'Tieni un solo manubrio sul lato opposto alla gamba anteriore per raddoppiare il lavoro del gluteo medio.'
        }
      },
      {
        id: 'standing-calf-raise',
        name: 'Calf Raise in Piedi',
        subtitle: 'Sviluppo ed esplosività del gastrocnemio',
        equipment: 'Macchina polpacci o Step + Manubrio',
        muscleKey: 'calves',
        secondaryKeys: [],
        illustration: '/ex/calves.webp',
        targetMuscles: {
          primary: ['Gastrocnemio', 'Soleo (Polpacci)'],
          secondary: ['Tendine d’Achille', 'Piede']
        },
        defaultSets: 4,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8.5',
        lastRecord: '75kg × 14',
        execution: {
          setup: 'Appoggia solo gli avampiedi sul bordo dello step. Ginocchia distese ma morbide.',
          eccentric: 'Scendi con i talloni il più in basso possibile e trattieni l’allungamento completo per 2 secondi.',
          concentric: 'Sollevati sulla punta dei piedi alla massima altezza ed esegui un fermo isometrico di 1 secondo in cima.',
          breathing: 'Inspira scendendo, espira sollevandoti in punta di piedi.',
          commonMistakes: [
            'Rimbalzare a ritmo rapido sfruttando l’elasticità del tendine d’Achille.',
            'Flettere le ginocchia durante la spinta.'
          ],
          proTip: 'Il fermo di 2 secondi nel punto più basso azzera l’energia elastica e costringe il muscolo a lavorare davvero.'
        }
      }
    ]
  },
  {
    id: 'upper-push-pull',
    title: 'SPINTA & TRAZIONE • UPPER BODY HYPERTROPHY',
    shortTitle: 'Spinta & Trazione',
    description: 'Seduta completa per la parte superiore del corpo: petto, dorso, deltoidi e braccia.',
    category: 'Parte Superiore',
    durationMinutes: 60,
    difficulty: 'Tutti i livelli',
    accentColor: '#D9A184', // GymMane Clay
    exercises: [
      {
        id: 'bench-press',
        name: 'Panca Piana con Bilanciere',
        subtitle: 'Fondamentale per spinta toracica e tricipiti',
        equipment: 'Panca piana + Bilanciere olimpico',
        muscleKey: 'chest',
        secondaryKeys: ['triceps', 'shoulders'],
        illustration: '/ex/chest.webp',
        targetMuscles: {
          primary: ['Gran Pettorale'],
          secondary: ['Deltoide Anteriore', 'Tricipiti', 'Gran Dentato']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        lastRecord: '80kg × 8',
        execution: {
          setup: 'Occhi sotto il bilanciere, piedi piantati saldamente al suolo. Adduci e deprimi le scapole creando un arco dorsale fisiologico.',
          eccentric: 'Abbassa il bilanciere con traiettoria controllata verso la linea dei capezzoli. Gomiti aperti a circa 45-60° dal busto.',
          concentric: 'Spingi con forza verso l’alto e leggermente indietro senza mai perdere il blocco scapolare.',
          breathing: 'Inspira gonfiando la cassa toracica prima della discesa, espira superando il punto critico di risalita.',
          commonMistakes: [
            'Gomiti aperti a 90° (a croce) con rischio di impingement della spalla.',
            'Far rimbalzare il bilanciere sullo sterno.'
          ],
          proTip: 'Immagina di voler spezzare a metà il bilanciere con le mani verso l’esterno per attivare i dorsali stabilizzatori.'
        }
      },
      {
        id: 'barbell-bent-row',
        name: 'Rematore con Bilanciere',
        subtitle: 'Spessore per gran dorsale e catena posteriore',
        equipment: 'Bilanciere olimpico',
        muscleKey: 'back',
        secondaryKeys: ['biceps', 'trapezius', 'forearm'],
        illustration: '/ex/back.webp',
        targetMuscles: {
          primary: ['Gran Dorsale', 'Romboidi', 'Trapezio'],
          secondary: ['Bicipiti', 'Deltoidi Posteriori', 'Core']
        },
        defaultSets: 4,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        lastRecord: '70kg × 10',
        execution: {
          setup: 'Busto inclinato a 45° con ginocchia sbloccate e schiena perfettamente neutra. Presa prona alla larghezza delle spalle.',
          concentric: 'Tira la sbarra verso l’ombelico guidando i gomiti indietro e serrando le scapole a fine corsa.',
          eccentric: 'Ritorna accompagnando il peso con controllo fino al completo allungamento del dorsale.',
          breathing: 'Espira tirando verso l’addome, inspira scendendo in allungamento.',
          commonMistakes: [
            'Dondolare con la schiena per darsi slancio.',
            'Tirare il bilanciere verso la gola anziché verso l’ombelico.'
          ],
          proTip: 'Pensa ai tuoi gomiti come all’unico punto di trazione: le mani sono solo ganci.'
        }
      },
      {
        id: 'overhead-press',
        name: 'Military Press con Bilanciere',
        subtitle: 'Forza verticale per deltoidi e stabilità del core',
        equipment: 'Bilanciere olimpico',
        muscleKey: 'shoulders',
        secondaryKeys: ['triceps', 'trapezius'],
        illustration: '/ex/shoulders.webp',
        targetMuscles: {
          primary: ['Deltoidi (Anteriore e Laterale)'],
          secondary: ['Tricipiti', 'Trapezio', 'Core']
        },
        defaultSets: 3,
        defaultReps: '8 - 10',
        defaultRestSeconds: 90,
        rpe: '8',
        lastRecord: '45kg × 8',
        execution: {
          setup: 'In piedi con glutei e addome serrati. Bilanciere sulle clavicole, presa appena fuori dalle spalle.',
          concentric: 'Sposta il mento indietro per far passare la sbarra, poi spingi verticalmente fin sopra la testa.',
          eccentric: 'Accompagna il bilanciere al petto mantenendo i gomiti leggermente avanzati.',
          breathing: 'Inspira al petto creando pressione nel tronco, espira spingendo verso l’alto.',
          commonMistakes: [
            'Inarcare esageratamente la schiena per compensare un carico troppo alto.'
          ],
          proTip: 'Stringi fortissimo i glutei: eliminerai ogni dispersione di forza.'
        }
      },
      {
        id: 'cable-pushdown',
        name: 'Pushdown Tricipiti al Cavo',
        subtitle: 'Isolamento per tutte e tre le teste del tricipite',
        equipment: 'Cavo alto con corda o barra',
        muscleKey: 'triceps',
        secondaryKeys: ['forearm'],
        illustration: '/ex/triceps.webp',
        targetMuscles: {
          primary: ['Tricipite Brachiale'],
          secondary: ['Avambracci']
        },
        defaultSets: 3,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8.5',
        lastRecord: '30kg × 12',
        execution: {
          setup: 'Gomiti incollati ai fianchi, busto leggermente inclinato in avanti.',
          concentric: 'Estendi completamente le braccia spingendo verso il basso. Nel punto di massima contrazione, apri leggermente la corda.',
          eccentric: 'Risali fino a formare un angolo di 90° al gomito senza muovere le spalle.',
          breathing: 'Espira distendendo le braccia, inspira tornando alla posizione flessa.',
          commonMistakes: [
            'Muovere i gomiti avanti e indietro trasformandolo in un esercizio per il petto.'
          ],
          proTip: 'Blocca le braccia come se fossero perni fissati al busto: muovi solo l’avambraccio.'
        }
      },
      {
        id: 'barbell-bicep-curl',
        name: 'Curl Bicipiti con Bilanciere',
        subtitle: 'Costruzione di picco e densità per i flessori del braccio',
        equipment: 'Bilanciere dritto o sagomato EZ',
        muscleKey: 'biceps',
        secondaryKeys: ['forearm'],
        illustration: '/ex/biceps.webp',
        targetMuscles: {
          primary: ['Bicipite Brachiale', 'Brachiale'],
          secondary: ['Avambracci']
        },
        defaultSets: 3,
        defaultReps: '10 - 12',
        defaultRestSeconds: 60,
        rpe: '8.5',
        lastRecord: '35kg × 10',
        execution: {
          setup: 'In piedi con presa supina alla larghezza delle spalle. Spalle basse e depresse.',
          concentric: 'Fletti i gomiti sollevando la sbarra verso il petto strizzando i bicipiti in cima.',
          eccentric: 'Scendi lentamente in 3 secondi fino a estendere completamente il braccio.',
          breathing: 'Espira salendo, inspira scendendo con controllo.',
          commonMistakes: [
            'Oscillare col bacino o la schiena (cheating esagerato).'
          ],
          proTip: 'Non permettere ai gomiti di avanzare in alto: tienili fermi lungo i fianchi.'
        }
      }
    ]
  },
  {
    id: 'core-functional',
    title: 'CORE & FUNZIONALE • STABILITÀ & CATENA POSTERIORE',
    shortTitle: 'Core & Funzionale',
    description: 'Addome profondo, stabilità articolare, catena posteriore e condizionamento.',
    category: 'Core & Funzionale',
    durationMinutes: 45,
    difficulty: 'Tutti i livelli',
    accentColor: '#D9A184', // GymMane Clay
    exercises: [
      {
        id: 'hanging-leg-raise',
        name: 'Sollevamento Gambe alla Sbarra',
        subtitle: 'Forza pura per il retto addominale',
        equipment: 'Sbarra per trazioni',
        muscleKey: 'abdomen',
        secondaryKeys: ['forearm'],
        illustration: '/ex/abdomen.webp',
        targetMuscles: {
          primary: ['Retto dell’Addome'],
          secondary: ['Flessori dell’anca', 'Avambracci']
        },
        defaultSets: 3,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8.5',
        lastRecord: 'Corpo libero × 15',
        execution: {
          setup: 'Appeso alla sbarra con scapole attive. Corpo fermo e controllato.',
          concentric: 'Arrotola il bacino verso l’alto sollevando le gambe verso il petto.',
          eccentric: 'Ritorna evitando di iniziare ad oscillare a pendolo.',
          breathing: 'Espira arrotolando il bacino, inspira ridiscendendo.',
          commonMistakes: [
            'Dondolare avanti e indietro sfruttando l’inerzia.'
          ],
          proTip: 'Pensa ad avvicinare il pube allo sterno, non solo ad alzare le gambe.'
        }
      },
      {
        id: 'side-plank',
        name: 'Plank Laterale Dinamico',
        subtitle: 'Anti-flessione laterale e stabilità degli obliqui',
        equipment: 'Tappetino a terra',
        muscleKey: 'obliques',
        secondaryKeys: ['shoulders', 'glutes'],
        illustration: '/ex/obliques.webp',
        targetMuscles: {
          primary: ['Obliqui Interni ed Esterni'],
          secondary: ['Gluteo Medio', 'Deltoidi']
        },
        defaultSets: 3,
        defaultReps: '12 per lato',
        defaultRestSeconds: 60,
        rpe: '8',
        lastRecord: '12 per lato',
        execution: {
          setup: 'Poggiato sull’avambraccio laterale, corpo allineato dalla testa ai piedi.',
          concentric: 'Solleva il bacino creando una linea retta perfetta tra caviglie e spalle.',
          eccentric: 'Abbassa il bacino sfiorando il suolo per poi risalire.',
          breathing: 'Respiro ritmico e costante.',
          commonMistakes: [
            'Ruotare il busto in avanti o indietro.'
          ],
          proTip: 'Spingi forte con l’anca verso il soffitto.'
        }
      },
      {
        id: 'barbell-shrug',
        name: 'Scrollate con Bilanciere',
        subtitle: 'Densità ed elevazione per i trapezi superiori',
        equipment: 'Bilanciere olimpico',
        muscleKey: 'trapezius',
        secondaryKeys: ['forearm'],
        illustration: '/ex/trapezius.webp',
        targetMuscles: {
          primary: ['Trapezio Superiore'],
          secondary: ['Avambracci']
        },
        defaultSets: 3,
        defaultReps: '12 - 15',
        defaultRestSeconds: 60,
        rpe: '8.5',
        lastRecord: '90kg × 12',
        execution: {
          setup: 'In piedi con bilanciere a contatto con le cosce. Braccia tese.',
          concentric: 'Solleva le spalle verso le orecchie in linea retta senza ruotarle.',
          eccentric: 'Rilascia le spalle verso il basso sentendo il trapezio allungarsi.',
          breathing: 'Espira sollevando le spalle, inspira abbassandole.',
          commonMistakes: [
            'Ruotare le spalle in cerchio (pericoloso per la cuffia dei rotatori).'
          ],
          proTip: 'Trattieni la contrazione massima per 1 secondo in cima prima di scendere.'
        }
      }
    ]
  }
];
