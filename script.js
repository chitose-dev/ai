let currentScenario = null;
let messageCount = 0;
let selectedHeart = null;
let selectedHeartData = {};

// 心のメッセージデータ
const heartMessages = {
    metta: {
        icon: '🌸',
        name: '慈（Loving-kindness）',
        message: '今日は"慈（Loving-kindness）"の心を意識してみましょう。\n\n相手を変えようとせず、"幸せであってほしい"という願いだけを静かに向けてください。\nその願いは、相手だけでなく、自分自身にも届いています。'
    },
    karuna: {
        icon: '🌊',
        name: '悲（Compassion）',
        message: '今日は"悲（Compassion）"の心を意識してみましょう。\n\n苦しみを消そうとせず、"共に感じる"ことから始めてください。\nあなたがそばにいることで、痛みは少しやわらぐかもしれません。'
    },
    mudita: {
        icon: '☀️',
        name: '喜（Empathic Joy）',
        message: '今日は"喜（Empathic Joy）"の心を意識してみましょう。\n\n他者の幸せや成長を、自分のことのように感じてみてください。\n嫉妬や比較を手放し、"ともにうれしい"を分かち合いましょう。'
    },
    upekkha: {
        icon: '🍃',
        name: '捨（Equanimity）',
        message: '今日は"捨（Equanimity）"の心を意識してみましょう。\n\nすべてを抱え込まず、判断や執着を手放してみてください。\nどんな波が来ても、あなたの心の奥には、静かな湖のような穏やかさが残っています。'
    },
    'empathic-understanding': {
        icon: '💧',
        name: '共感的理解（Empathic Understanding）',
        message: '今日は"共感的理解（Empathic Understanding）"を意識してみましょう。\n\n言葉の奥にある"その人の世界"を感じてみてください。\n相手の立場から世界を眺めることが、癒しの始まりです。'
    },
    'unconditional-regard': {
        icon: '🌷',
        name: '無条件の肯定的配慮（Unconditional Positive Regard）',
        message: '今日は"無条件の肯定（Unconditional Positive Regard）"の心を意識してみましょう。\n\nたとえ相手の行動が理解できなくても、存在そのものを大切に思ってください。\n"あなたがここにいてくれていい"という肯定を、心の中で伝えてみてください。'
    },
    congruence: {
        icon: '🌾',
        name: '自己一致（Congruence）',
        message: '今日は"自己一致（Congruence）"の心を意識してみましょう。\n\nあなたの感じていること、考えていること、言葉が重なる瞬間を見つけてください。\n正しさより、誠実さ。飾らず、ありのままのあなたでいてください。'
    },
    abstinence: {
        icon: '🕊️',
        name: '臨床的禁欲（Therapeutic Abstinence）',
        message: '今日は"臨床的禁欲（Therapeutic Abstinence）"を意識してみましょう。\n\n自分の欲求や承認欲を、少しだけ脇に置いてみてください。\n相手の物語に入りすぎず、あなたの静けさを保つことが、最大の支援になります。'
    }
};

// 心の解説コンテンツ
const heartExplanations = {
    metta: {
        icon: '🌸',
        title: '慈（Metta）',
        subtitle: 'Loving-kindness',
        origin: `
            <p>「慈（Metta）」は、パーリ語で「友愛」「優しさ」「思いやり」を意味します。
            仏教の四無量心（四梵住）の一つで、「全ての存在が幸せであり、苦しみから解放されますように」という願いの心です。</p>
            <p>この心は、条件付きではなく、誰に対しても分け隔てなく向けられるものとされています。
            自分自身、愛する人、見知らぬ人、そして敵対する人まで、すべての存在に対して等しく向けられます。</p>
        `,
        clinical: `
            <p>臨床の場において「慈」は、クライエントの幸せを純粋に願う姿勢として現れます。
            何かを与えたり、変えたり、修正したりするのではなく、ただその人が幸せであってほしいと願うことです。</p>
            <p>この姿勢は、支援者がクライエントに対して持つ無条件の肯定的配慮（unconditional positive regard）
            と共鳴する部分があります。クライエントを「何かを直すべき対象」ではなく、「幸せになる権利を持つ一人の人間」として
            見ることができるようになります。</p>
            <p>特に子どもとの関わりでは、成績や行動の改善を超えて、ただその子が幸せであってほしいという
            純粋な願いを持つことで、支援の質が深まります。</p>
        `,
        tips: [
            "瞑想の始めに「私自身が幸せでありますように」と自分自身に慈しみの心を向けてみましょう",
            "会話の合間に、心の中で「あなたが幸せでありますように」と静かに唱えてみましょう",
            "難しいクライエントに対応する前に、その人の幸せを純粋に願うイメージを持ちましょう",
            "「何かをしなければ」という焦りを感じたら、一度立ち止まり、ただ「幸せであってほしい」という願いに戻りましょう",
            "自分自身への慈しみも忘れずに。自分が満たされていてこそ、他者にも与えることができます"
        ]
    },
    karuna: {
        icon: '🌊',
        title: '悲（Karuna）',
        subtitle: 'Compassion',
        origin: `
            <p>「悲（Karuna）」は、パーリ語で「共苦」「哀れみ」を意味します。
            四無量心の一つで、「苦しみを感じている存在の苦しみを取り除きたい」という心です。</p>
            <p>これは単なる同情や憐れみとは異なります。他者の苦しみを感じ取りつつも、
            その苦しみに飲み込まれることなく、その苦しみから解放されるよう願い、
            可能であれば具体的に手を差し伸べる積極的な姿勢です。</p>
        `,
        clinical: `
            <p>臨床場面での「悲」は、クライエントの苦しみを共に感じる能力として現れます。
            苦しみを「直すべき問題」としてではなく、まず「共に感じるべき現実」として
            受け止める姿勢が重要です。</p>
            <p>多くの支援者は、クライエントの苦しみをすぐに軽減したいという気持ちから、
            解決策や励ましを急ぎがちですが、そうする前に、まず「共に感じる時間」を持つことが
            真の共感につながります。</p>
            <p>特に子どもの痛みや悲しみに対しては、「大丈夫だよ」と否定せず、
            「つらいね」と認め、そばにいることが深い癒しをもたらします。</p>
        `,
        tips: [
            "クライエントが苦しみを表現している時、まず「解決」を考える前に、その場に留まり、共に感じる時間を持ちましょう",
            "「何とかしなければ」という焦りを感じたら、一呼吸おいて、ただそばにいることの価値を思い出しましょう",
            "相手の苦しみを聞いた後に、自分の中に生じた感情に気づき、それを抱えながらも専門的な距離を保ちましょう",
            "特に子どもの「痛い」「悲しい」という表現に対して、すぐに気をそらさず、まずその感情を受け止めましょう",
            "自分自身の苦しみにも悲の心を向け、自己共感の時間を持ちましょう"
        ]
    },
    mudita: {
        icon: '☀️',
        title: '喜（Mudita）',
        subtitle: 'Empathic Joy',
        origin: `
            <p>「喜（Mudita）」は、パーリ語で「共に喜ぶ」「他者の幸せを喜ぶ」ことを意味します。
            四無量心の一つで、嫉妬や比較の心がなく、他者の幸福や成功を自分のことのように
            心から喜ぶ態度を表します。</p>
            <p>これは西洋的な共感（empathy）とは少し異なり、他者の喜びを「分かち合う」だけでなく、
            自分自身の喜びとして「増幅する」という積極的な側面を持っています。</p>
        `,
        clinical: `
            <p>臨床場面では、クライエントの小さな成長や前進を心から喜ぶ姿勢として現れます。
            これは単なる励ましや褒め言葉ではなく、その人の中に現れた良いものを
            純粋に喜ぶ心です。</p>
            <p>支援者がクライエントの成功や喜びを心から共に喜ぶことは、
            肯定的な自己像の形成を助け、レジリエンス（回復力）を高めます。
            特に子どもは、大人が自分の小さな成功を純粋に喜ぶ姿を見ることで、
            自己肯定感を育みます。</p>
            <p>また、この姿勢は支援者自身の燃え尽き予防にもつながります。
            苦しみを共有するだけでなく、喜びも共有することで、エネルギーのバランスが保たれます。</p>
        `,
        tips: [
            "クライエントの小さな前進や成功を見逃さず、心から一緒に喜びましょう",
            "「喜び」に対する注意力を高める練習をしましょう。毎日3つの「喜び」を見つけ、メモする習慣をつけてみてください",
            "子どもの喜びを「大人の基準」で測らず、その子自身の喜びをそのままの大きさで受け止めましょう",
            "自分と比較したり、評価したりせずに、純粋に相手の喜びを感じましょう",
            "自分自身の小さな成功や喜びも大切にし、自分を労いましょう"
        ]
    },
    upekkha: {
        icon: '🍃',
        title: '捨（Upekkha）',
        subtitle: 'Equanimity',
        origin: `
            <p>「捨（Upekkha）」は、パーリ語で「平静」「平等心」を意味します。
            四無量心の一つで、あらゆる状況において心の平静さを保ち、
            執着や嫌悪、好き嫌いの二元性を超えた心の状態を指します。</p>
            <p>これは「無関心」や「無感動」とは全く異なります。むしろ、
            深い関与と思いやりを持ちながらも、結果への執着や状況への
            判断を手放した、開かれた心の状態です。</p>
        `,
        clinical: `
            <p>臨床場面での「捨」は、クライエントの状態や変化に過度に執着せず、
            平静さを保ちながら関わる姿勢として現れます。クライエントの波に巻き込まれず、
            穏やかな「器」であり続けることは、安全な関係性の基盤になります。</p>
            <p>支援者がクライエントの成功や失敗、進歩や後退に一喜一憂せず、
            常に変わらぬ信頼と受容の姿勢を示すことで、クライエントは自分自身の
            プロセスを信頼できるようになります。</p>
            <p>特に子どもは、大人の感情的な反応に敏感です。支援者が平静さを保ち、
            子どものどんな状態も「あってよい」と受け止める姿勢は、子ども自身が
            自分の感情を安全に探求する空間を作ります。</p>
        `,
        tips: [
            "クライエントの状態に一喜一憂せず、どんな状態も「今、ここにある現実」として受け止めましょう",
            "「成功させなければ」「良くならなければ」という結果への執着に気づいたら、呼吸に意識を戻し、プロセスを信頼しましょう",
            "どんな感情が湧いても、その感情に飲み込まれず、「今、こんな感情が湧いている」と観察する習慣をつけましょう",
            "毎日5分でも良いので、静かに座り、呼吸と共に「どんなことが起きても、私は平静でいられる」と自分に言い聞かせる時間を持ちましょう",
            "自分自身の完璧主義や理想の形に気づき、「今のまま十分」という優しさを自分にも向けましょう"
        ]
    },
    'empathic-understanding': {
        icon: '💧',
        title: '共感的理解',
        subtitle: 'Empathic Understanding',
        origin: `
            <p>「共感的理解」は、カール・ロジャーズが提唱した人間中心アプローチの中核的態度の一つです。
            これは、相手の内的照合枠（internal frame of reference）に入り込み、
            その人の世界をその人の立場から感じ取ろうとする姿勢です。</p>
            <p>単に「相手の気持ちが分かる」という表面的な理解ではなく、
            その人が経験している主観的世界に入り込み、「もし私がその人だったら」という
            視点から相手の体験を感じ取ることを意味します。</p>
        `,
        clinical: `
            <p>臨床場面での共感的理解は、クライエントが自分自身を理解し、
            受け入れるための鏡として機能します。支援者が非評価的な姿勢で
            クライエントの主観的体験を理解しようと努めることで、クライエントは
            自分の感情や思考を安全に探索できるようになります。</p>
            <p>特に子どもとの関わりでは、大人の「常識」や「理屈」ではなく、
            子どもの論理や感覚の世界に入り込むことが重要です。
            「なぜそんなことで泣くの？」と否定するのではなく、
            「あなたにとってはとても大切なことなんだね」と子どもの世界を
            尊重することで、安心感と信頼関係が生まれます。</p>
            <p>共感的理解は「賛同」や「同意」とは異なります。相手の視点を理解することと、
            その視点に同意することは別です。理解することによって、より効果的な支援が可能になります。</p>
        `,
        tips: [
            "「もし私がこの人だったら」という視点を意識的に取り入れる練習をしましょう",
            "相手の言葉を理解しようとするだけでなく、その言葉の背景にある感情や価値観にも注意を向けましょう",
            "「あなたにとっては〜なんですね」という言葉を使い、相手の主観的体験を尊重する姿勢を示しましょう",
            "自分の価値観や常識で相手を判断していないか、常に自分の反応を観察しましょう",
            "特に子どもの「非論理的」に見える行動や発言にも、その子なりの「論理」があることを忘れないようにしましょう"
        ]
    },
    'unconditional-regard': {
        icon: '🌷',
        title: '無条件の肯定的配慮',
        subtitle: 'Unconditional Positive Regard',
        origin: `
            <p>「無条件の肯定的配慮」は、カール・ロジャーズが提唱した人間中心アプローチの中核的態度の一つです。
            これは、相手の行動や考えの良し悪しを評価することなく、
            その人の存在そのものを尊重し、無条件に価値ある存在として受け入れる姿勢を指します。</p>
            <p>「条件付きの愛」や「評価的な受容」とは対照的に、
            相手がどのように振る舞おうとも、その根底にある「人間としての価値」は
            揺るがないという信念に基づいています。</p>
        `,
        clinical: `
            <p>臨床場面での無条件の肯定的配慮は、クライエントが防衛的になることなく、
            自分の弱さや否定的な側面も含めて、ありのままの自分を表現できる安全な環境を
            作り出します。</p>
            <p>支援者がクライエントを評価や判断なしに受け入れることで、
            クライエントは自分自身を同じように受け入れる方法を学びます。
            これは自己批判や自己否定の強い人にとって、特に治療的な体験となります。</p>
            <p>子どもへの関わりでは、「いい子」「悪い子」という評価ではなく、
            どんな状態の時でも「あなたはそのままでいいんだよ」というメッセージを
            一貫して伝えることが、健全な自己肯定感の土台となります。</p>
        `,
        tips: [
            "クライエントの発言や行動に対して、内心で「良い」「悪い」と判断していないか、自分の反応に注意を払いましょう",
            "特に「問題行動」と思われる行為の背後にある、その人なりの理由や意味を理解しようとする姿勢を持ちましょう",
            "「〜すべき」「〜でなければならない」という言葉を使っていないか意識し、代わりに「〜かもしれませんね」「〜という選択肢もあります」という表現を心がけましょう",
            "子どもへの関わりでは、行動と存在を区別する言葉かけを工夫しましょう（「あなたは悪い子」ではなく「その行動は危ないよ」など）",
            "自分自身にも無条件の肯定的配慮を向ける練習をしましょう。自己批判や自己否定の言葉に気づいたら、優しく自分を受け入れる言葉に置き換えてみましょう"
        ]
    },
    congruence: {
        icon: '🌾',
        title: '自己一致',
        subtitle: 'Congruence',
        origin: `
            <p>「自己一致」は、カール・ロジャーズが提唱した人間中心アプローチの中核的態度の一つです。
            これは、支援者の内面の感情や思考と、外に表現される言動が一致している状態を指します。
            言い換えれば、「仮面」や「専門家としての構え」を脱ぎ、
            誠実に、透明性を持って関わる姿勢です。</p>
            <p>完璧である必要はなく、むしろ自分の限界や弱さも認め、
            必要に応じて適切に表現することが、真の自己一致につながります。</p>
        `,
        clinical: `
            <p>臨床場面での自己一致は、支援者とクライエントの間に真正な関係性を
            構築する基盤となります。支援者が「専門家の顔」ではなく、
            一人の人間として誠実に存在することで、クライエントも同様に
            自分らしく存在する勇気を得ます。</p>
            <p>自己一致は、支援者の感情をすべて表現するという意味ではありません。
            むしろ、自分の内側で起きていることに正直であり、関係性に役立つ形で
            適切に表現することを意味します。</p>
            <p>子どもとの関わりでは、大人が「完璧な存在」を演じるのではなく、
            適切な範囲で自分の感情や考えを正直に伝えることが、
            子どもの健全な情緒発達と対人関係の形成を助けます。</p>
        `,
        tips: [
            "自分の内側で感じていることと、外に表現していることのギャップに気づく練習をしましょう",
            "「専門家として」ではなく「一人の人間として」何を感じているか、自分に正直になる時間を持ちましょう",
            "自分の限界や不確かさを適切に認める言葉を使いましょう（「それについては私もわかりません」「今のあなたの話を聞いて、私も少し混乱しています」など）",
            "特に子どもとの関わりでは、適切な範囲で自分の感情を言語化することで、感情表現のモデルになりましょう（「先生も少し悲しくなったよ」「あなたの頑張りを見て、とてもうれしく思います」など）",
            "自分自身の内的体験に対して、評価や判断をせずに「今、ここ」で感じていることに気づく瞑想的な練習を日常に取り入れましょう"
        ]
    },
    abstinence: {
        icon: '🕊️',
        title: '臨床的禁欲',
        subtitle: 'Therapeutic Abstinence',
        origin: `
            <p>「臨床的禁欲」は、精神分析の伝統から生まれた概念で、
            支援者が自身の欲求や願望をコントロールし、クライエントのために
            空間と自由を提供する姿勢を指します。</p>
            <p>これは単なる「距離を置くこと」や「冷たさ」ではなく、
            自分の欲求（称賛されたい、役に立ちたい、問題を解決したいなど）を
            意識的に脇に置き、クライエントのプロセスに焦点を当てる積極的な態度です。</p>
        `,
        clinical: `
            <p>臨床場面での臨床的禁欲は、支援者が自分の欲求充足のために
            クライエントを利用することを防ぎ、クライエント中心の関係性を
            保つために重要です。</p>
            <p>多くの支援者は「役に立ちたい」「変化を起こしたい」「良い支援者と思われたい」
            という欲求を持っています。これらの欲求に気づき、コントロールすることで、
            クライエントが自分のペースでプロセスを進める自由と空間が生まれます。</p>
            <p>子どもとの関わりでは、大人の期待や欲求を押し付けず、
            子ども自身の自発性や内発的動機づけを尊重する姿勢につながります。
            特に「早く成長してほしい」「問題を解決してほしい」という
            大人側の焦りを認識し、手放すことが重要です。</p>
        `,
        tips: [
            "自分がクライエントとの関係の中で何を「得たい」と思っているか、正直に自己観察してみましょう",
            "「成果を出したい」「良い支援者と思われたい」という欲求に気づいたら、深呼吸して手放す練習をしましょう",
            "沈黙や「何も起きていない時間」を恐れず、ただそこにいることを大切にしましょう",
            "「私が何かしなければ」という焦りを感じたら、その焦りは誰のものか、自問してみましょう",
            "定期的に自己省察の時間を持ち、自分の欲求や動機を理解することで、より意識的な臨床姿勢を育みましょう"
        ]
    }
};

// シナリオデータ
const scenarios = {
    1: {
        title: "シナリオ1：学校への不安",
        description: "中学2年生の女子生徒。最近学校に行きづらくなっており、友人関係に悩んでいる様子。",
        initialMessage: "こんにちは... 実は、最近学校に行くのがちょっと辛くて...",
        difficulty: "beginner",
        order: 1
    },
    2: {
        title: "シナリオ2：親子関係の葛藤",
        description: "小学5年生の男子児童。両親の期待に応えたい気持ちと、自分のやりたいことの間で揺れている。",
        initialMessage: "先生、聞いてもらっていいですか？ お父さんとお母さんのこと、なんだけど...",
        difficulty: "intermediate",
        order: 2
    },
    3: {
        title: "シナリオ3：感情の混乱",
        description: "高校1年生の生徒。最近イライラすることが多く、自分でも理由がわからず戸惑っている。",
        initialMessage: "なんか最近、すごくイライラするんです。自分でも何でかわからなくて...",
        difficulty: "intermediate",
        order: 3
    },
    4: {
        title: "シナリオ4：沈黙との向き合い",
        description: "中学3年生の生徒。話したいことがあるようだが、なかなか言葉にできず、長い沈黙が続く。",
        initialMessage: "......（しばらく黙っている）",
        difficulty: "advanced",
        order: 4
    }
};

// ホーム画面（表紙）へ戻る
function backToHome() {
    // 全ての画面を非表示
    document.querySelectorAll('.heart-preparation-screen, .scenario-selection, .dialogue-screen, .feedback-screen, .scenario-creator-screen, .heart-explanation-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    // ホーム画面を表示
    document.querySelector('.welcome-screen').style.display = 'block';
    
    // 選択をリセット
    document.querySelectorAll('.heart-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('ai-message').classList.remove('show');
    document.getElementById('proceed-btn').style.display = 'none';
    selectedHeart = null;
}

// 心選択画面を表示
function showHeartSelectionScreen() {
    document.querySelector('.welcome-screen').style.display = 'none';
    document.querySelector('.heart-preparation-screen').style.display = 'block';
}

// 心を選択
function selectHeart(heart, element) {
    // 既存の選択を解除
    document.querySelectorAll('.heart-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 新しい選択を適用
    element.classList.add('selected');
    selectedHeart = heart;
    selectedHeartData = heartMessages[heart];
    
    // AIメッセージを表示
    const messageDiv = document.getElementById('ai-message');
    const messageText = document.getElementById('heart-message');
    messageText.textContent = selectedHeartData.message;
    messageDiv.classList.add('show');
    
    // 進むボタンを表示
    document.getElementById('proceed-btn').style.display = 'inline-block';
}

// 心の解説ページを表示
function showHeartExplanation() {
    if (!selectedHeart) return;
    
    const explanationData = heartExplanations[selectedHeart];
    
    // 解説ページの内容を設定
    document.getElementById('explanation-icon').textContent = explanationData.icon;
    document.getElementById('explanation-title').textContent = explanationData.title;
    document.getElementById('explanation-subtitle').textContent = explanationData.subtitle;
    document.getElementById('explanation-origin').innerHTML = explanationData.origin;
    document.getElementById('explanation-clinical').innerHTML = explanationData.clinical;
    
    // ヒントリストをクリアして追加
    const tipsList = document.getElementById('explanation-tips');
    tipsList.innerHTML = '';
    explanationData.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
    
    // 心選択画面を非表示にし、解説画面を表示
    document.querySelector('.heart-preparation-screen').style.display = 'none';
    document.querySelector('.heart-explanation-screen').style.display = 'block';
}

// シナリオ選択画面へ進む
function proceedToScenarios() {
    document.querySelector('.heart-explanation-screen').style.display = 'none';
    document.querySelector('.scenario-selection').style.display = 'block';
}

// シナリオを開始
function startScenario(scenarioId) {
    currentScenario = scenarioId;
    const scenario = scenarios[scenarioId];
    
    document.querySelector('.scenario-selection').style.display = 'none';
    document.querySelector('.dialogue-screen').style.display = 'block';
    
    // 選択した心を表示
    if (selectedHeart) {
        document.getElementById('reminder-icon').textContent = selectedHeartData.icon;
        document.getElementById('reminder-text').textContent = `今日の心：${selectedHeartData.name}`;
    }
    
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-description').textContent = scenario.description;
    
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = `
        <div class="message client">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                ${scenario.initialMessage}
            </div>
        </div>
    `;
    
    messageCount = 0;
}

// メッセージを送信
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    const chatArea = document.getElementById('chat-area');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message therapist';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="sukoyaka-character.jpeg" alt="すこやか">
        </div>
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    input.value = '';
    messageCount++;
    
    // バックエンド実装時にここでAI応答を取得
    setTimeout(() => {
        addClientMessage("（ここにAIクライアントの応答が表示されます）");
    }, 1000);
}

// クライアントのメッセージを追加
function addClientMessage(message) {
    const chatArea = document.getElementById('chat-area');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message client';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Enterキーでメッセージを送信
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 対話を終了してフィードバック画面へ
function endDialogue() {
    document.querySelector('.dialogue-screen').style.display = 'none';
    document.querySelector('.feedback-screen').style.display = 'block';
    
    // バックエンド実装時にここで対話の分析とフィードバック生成
}

// シナリオ選択画面に戻る
function backToScenarios() {
    document.querySelector('.dialogue-screen').style.display = 'none';
    document.querySelector('.feedback-screen').style.display = 'none';
    document.querySelector('.scenario-creator-screen').style.display = 'none';
    document.querySelector('.scenario-selection').style.display = 'block';
}

// 心選択画面に戻る
function backToHeartSelection() {
    // 全ての画面を非表示
    document.querySelector('.dialogue-screen').style.display = 'none';
    document.querySelector('.feedback-screen').style.display = 'none';
    document.querySelector('.scenario-creator-screen').style.display = 'none';
    document.querySelector('.scenario-selection').style.display = 'none';
    document.querySelector('.heart-explanation-screen').style.display = 'none';
    
    // 導入画面を表示
    document.querySelector('.heart-preparation-screen').style.display = 'block';
    
    // 選択をリセット
    document.querySelectorAll('.heart-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('ai-message').classList.remove('show');
    document.getElementById('proceed-btn').style.display = 'none';
    selectedHeart = null;
    
    // 省察テキストをクリア
    document.getElementById('personal-reflection').value = '';
}

// 同じシナリオを再開
function restartScenario() {
    document.querySelector('.feedback-screen').style.display = 'none';
    
    // 省察テキストをクリア
    document.getElementById('personal-reflection').value = '';
    
    startScenario(currentScenario);
}

// 省察記録をダウンロード
function downloadReflection() {
    const reflectionText = document.getElementById('personal-reflection').value;
    
    if (!reflectionText.trim()) {
        alert('省察記録が入力されていません。');
        return;
    }
    
    // 現在の日時を取得
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    
    // ファイル内容を作成
    const content = `四無量心AIトレーニング - 省察記録
=============================================

日時: ${now.toLocaleString('ja-JP')}
選択した心: ${selectedHeartData.name || '未選択'}
シナリオ: ${scenarios[currentScenario]?.title || '未記録'}

=============================================

【今日、あなたが一番心を動かされた瞬間はどこでしたか？】

${reflectionText}

=============================================
© 一般社団法人 子ども心理発達支援センター すこやか
`;
    
    // Blobを作成
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    
    // ダウンロードリンクを作成
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `四無量心AI_省察記録_${dateStr}_${timeStr}.txt`;
    
    // ダウンロードを実行
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 成功メッセージ
    alert('省察記録をダウンロードしました。');
}

// シナリオ作成画面を表示
function showScenarioCreator() {
    document.querySelector('.scenario-selection').style.display = 'none';
    document.querySelector('.scenario-creator-screen').style.display = 'block';
}

// シナリオ作成をキャンセル
function cancelScenarioCreation() {
    document.querySelector('.scenario-creator-screen').style.display = 'none';
    document.querySelector('.scenario-selection').style.display = 'block';
    
    // フォームをリセット
    document.getElementById('scenario-theme').value = '';
    document.getElementById('client-age').value = '';
    document.getElementById('scenario-difficulty').value = 'beginner';
    document.getElementById('additional-notes').value = '';
    document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(cb => cb.checked = false);
}

// シナリオを生成
function generateScenario() {
    const theme = document.getElementById('scenario-theme').value.trim();
    const age = document.getElementById('client-age').value;
    const difficulty = document.getElementById('scenario-difficulty').value;
    const additionalNotes = document.getElementById('additional-notes').value.trim();
    
    const selectedFocus = [];
    document.querySelectorAll('.checkbox-label input[type="checkbox"]:checked').forEach(cb => {
        selectedFocus.push(cb.value);
    });
    
    if (!theme) {
        alert('シナリオのテーマ・状況を入力してください。');
        return;
    }
    
    if (!age) {
        alert('クライアントの年齢層を選択してください。');
        return;
    }
    
    // バックエンド実装時にここでAIにシナリオ生成を依頼
    console.log('シナリオ生成リクエスト:', {
        theme,
        age,
        difficulty,
        focus: selectedFocus,
        additionalNotes
    });
    
    alert('AIによるシナリオ生成機能は、バックエンド実装時に追加されます。\n\n入力内容:\n・テーマ: ' + theme + '\n・年齢層: ' + age + '\n・難易度: ' + difficulty);
    
    // 仮の動作：シナリオ選択画面に戻る
    cancelScenarioCreation();
}

// シナリオを並び替え
function sortScenarios() {
    const sortValue = document.getElementById('sort-select').value;
    const grid = document.getElementById('scenario-grid');
    const cards = Array.from(grid.children);
    
    if (sortValue === 'difficulty') {
        cards.sort((a, b) => {
            const diffA = a.querySelector('.difficulty-indicator.beginner') ? 1 :
                          a.querySelector('.difficulty-indicator.intermediate') ? 2 : 3;
            const diffB = b.querySelector('.difficulty-indicator.beginner') ? 1 :
                          b.querySelector('.difficulty-indicator.intermediate') ? 2 : 3;
            return diffA - diffB;
        });
    } else {
        // 登録順（元の順序に戻す）
        cards.sort((a, b) => {
            const orderA = parseInt(a.getAttribute('data-order')) || 0;
            const orderB = parseInt(b.getAttribute('data-order')) || 0;
            return orderA - orderB;
        });
    }
    
    // カードを再配置
    cards.forEach(card => grid.appendChild(card));
}

// ページ読み込み時に初期化
window.addEventListener('DOMContentLoaded', function() {
    // シナリオカードにdata-order属性を追加
    const cards = document.querySelectorAll('.scenario-card');
    cards.forEach((card, index) => {
        card.setAttribute('data-order', index + 1);
    });
    
    // 最初はホーム画面（表紙）を表示
    backToHome();
});
