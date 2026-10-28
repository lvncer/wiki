# Google IO 26

https://www.youtube.com/watch?v=tfx2CjqtCUI&list=PLOU2XLYxmsILVF9qmspC4i4R0t3o64HSx&index=2

Hello Shoreline and hello to everyone watching from around the world. Excited to be back for this year's I/O. I think it's been an incredible year. We are taking a differentiated, full stack approach to AI innovation to understand the scale at which people are adopting AI. There's another great proxy tokens.
The fundamental units of data are models process, many representing a problem being solved. We were processing 9.7 trillion tokens a month across the surfaces. And fast forward to today, that number has jumped seven times to 3.2 quadrillion tokens per month. We now have 13 products with over a billion users each.
Five of those have more than three billion users. Our Gemini models are a big reason more people are using our products and why they are using our products more. AI Overviews now has over 2.5 billion monthly users, and AI Mode has been a revelation. Our biggest upgrade to search ever in just a year, it's already surpassed 1 billion monthly users.
Last year at I/O, the Gemini app had 400 million monthly active users. Today we have surpassed 900 million. More than doubling in a year. People come to YouTube every day to ask a lot of questions. Ask YouTube entirely reimagines the experience. Say you want to teach your three-year-old how to ride a pedal bike, and they already know how to ride a balanced bike.
Just ask YouTube. With docs live, you can just verbally brain dump whatever is on your mind and let Gemini do the rest. So I just remembered I'm doing an alumni talk tomorrow. I need to come up with some talking points to explain what I do for a living as a software engineer. Can you just pull my resume from drive.
Although that might be boring. Maybe can you come up with some funny analogies. Oh, and also, I think the school sent me an email. Maybe just grab the details from there, throw them at the top of the doc so I know where to go and what time to get there. You've taken a fundamentally different approach with our training infrastructure.
With JAX and pathways, we can now seamlessly distribute training across multiple sites. Scaling across more than TPUs globally. This gives us the ability to create the largest training cluster in the world. To give you a live sense of what this speed feels like, here's a prompt on an upcoming Flash model. If it were running on a tie, I'll ask it to create a Chrome Dino game.
Push submit. The response is generated in real time as you watch. Take a look at the tokens per second in the top right corner. The speed is pretty incredible, nearly 1,500 tokens per second. It almost took longer to write out the request and the game is pretty fun too. There are three areas where I want to go deeper today to show you the progress in each model's coding and agents.
I'm excited to announce Gemini app Omni, our new model that can create anything from any input. It combines Gemini's intelligence with the best of our generative media models for a new level of World understanding, multi-modality and editing. We're starting with video, but over time, Omni will be able to generate any output from any input.
As generative AI gets better, so does the need for greater transparency. Since launch, SynthID is now watermarked over 100 billion images and videos. We want more people to have easy access to these tools, so we are expanding both SynthID and content credentials verification to search and Chrome. I'm thrilled to announce that OpenAI, I cacao and lemon labs are adopting Synthroid two today.
I'm excited to introduce Gemini 3.5 Flash, our first in a series of models. Combining frontier intelligence with action. When compared to 3.1 Pro Flash is better across the board. Almost all benchmarks 3.5 Flash is a very capable model at the frontier and comparable to the best models, but much, much faster.
It's in a whole league of its own in the top right quadrant, we've been using 3.5 Flash with the reimagined version of our agent first development platform, anti-gravity, and it's dramatically accelerated how we build. So using the new anti-gravity and Gemini 3.5 Flash, we asked our agents to take on what we consider to be a highly complex and impressive task build a working operating system from scratch over 12 hours.
93 subagents, working in parallel, made over 15,000 model requests and processed 2.6 billion tokens to take an initially empty project to the core of a functioning operating system. But clearly, this isn't a real OS unless I can play doom. Now, if I try running doom right now, it just doesn't work. Turns out that the OS is currently missing some necessary video and keyboard drivers.
I have a prompt prepared. I'm going to paste it in. Anti-gravity ended up doing a whole host of research. Ended up writing over 100 lines of code and then finally built the operating system. Let's take a peek and see if it works. Moment of truth. Amazing this was made possible by the New subagent teamwork capability.
We've optimized Flash to be not just four times, but 12 times faster in anti-gravity. Gemini 3.5 Flash is available for everyone today across our products and APIs. We are also excited for 3.5 Pro. We're using it internally. It's showing great improvements. I know you can't wait to get your hands on it. Give us until next month to get it to you.
Gemini 3.5 and anti-gravity are unlocking a new world of agents and agentic capabilities. We are super focused on bringing the power of agents safely and securely to consumers, so that they work for everyone. Introducing Gemini spark it's your personal AI agent that helps you navigate your digital life. Taking action on your behalf and under your direction.
It runs on dedicated virtual machines on Google Cloud and it's 24/7 seven. And yes, you can close your laptop. It's powered by Gemini 3.5 and the Google anti-gravity harness, which allows it to perform long running tasks easily in the background. Spark will integrate seamlessly with tools, starting with our own and in the coming weeks, with third party tools.
Through MCP. We're planning a big block party and you can see here this is a pretty complex prompt. We want help grabbing all the RSVP. Keep a list of who's bringing what. Remember to email those neighbors who haven't signed up yet. And what's amazing here is spark will go through step by step and again work across the various skills and apps that you have.
So the first one here, this is a live RSVP tracker. Writing Google Sheets and spark is amazing at just brain dumping things on your mind. Create a document with the top things my wife and I need to do for the kids before the end of the school year. Here we'll check in later, see how it's doing. And now we're entering the next chapter of Google Search, where incredible AI features aren't just in search.
Google Search is AI Search through and through. Now we're taking an exciting step toward this vision, where you'll be able to create and manage multiple AI agents for your many tasks right in search. To start can set information agents to work for you 24/7 7 in the background, and these will work with and alongside Gemini spark to help you get more done.
Say you're really into finance and you want to know more about big biotech want to know with under 15 positive cash flows and low debt right when it matters. It connects directly to our real time finance data. So you get up to the second updates on stock prices and insights on the market the moment it moves.
Now, when it does, your agent sends you an intelligent and synthesized update. It helps you understand what's going on so you can separate the signal from the noise. So search now has the ability to help you create entire custom stateful experiences, tools, trackers, dashboards, and especially awesome for those long running tasks where you want to keep coming back.
Search proactively offers to build a weekend planner for me, and I've chosen to securely connect Gmail, photos, and calendar. And boom, here it is. Looks like it's ready. And below, it's got all of these cool restaurant reservations and beautifully laid out on Maps. People shop across Google over a billion times a day.
Combine the scale of the shopping graph with our advanced Gemini models, and you get entirely new ways to shop. When it comes to agent e-commerce, we are focused on delivering three key building blocks. First, the universal commerce protocol, or UCP for short. Our second building block the agent payments protocol, or AP2.
A final building block the universal cart, a truly intelligent shopping cart. The moment you add a product, your cart goes to work for you in the background. Now, another game changer is how it applies intelligent reasoning. Let's say you're building your first custom PC. You see a motherboard with great reviews and just add that to your cart.
Now you already picked out a processor, but what you didn't realize is that the processor needs a motherboard with a different type of socket. Your cart catches this for you and suggests an alternative. Preventing a problem you didn't really see coming Today has been a jam packed Gemini day. We've completely redesigned the entire experience with neural expressive.
We're shipping the brand new Gemini Omni model and 3.5 Flash model with 3.5 Pro coming soon, and you can now put Gemini to work thanks to New features like the daily brief. It's a personalized digest it's designed to be your first stop every morning, synthesizing information from across my inbox, my calendar, my tasks.
It's finding the most important things for me to be aware of. And Gemini spark. You'll remember at the beginning of the show, we sent a few tasks off, so let's go check in on them. This is our school year planning checklist and I asked it. Remember, to create a doc of all the things I didn't want to forget between now and the end of the year.
And so I'll open this one up. And what's amazing about it takes advantage of all the Google Docs formatting so I can immediately click in. Whether you're a designer, an entrepreneur or an artist, our products help shrink the gap between the moment you have an idea and the moment you create it. At its best, technology is a Canvas for human creativity.
Introducing Google picks a new product in Google Workspace picks is our image creation and editing tool that helps you create just about anything with the creative controls you want. You can hover over an element and click to remove it. You can resize an object to fit the frame, add or edit text and translate all of it with just a few clicks.
We launched Google flow at I/O last year. Flow could only execute one prompt at a time. Now your agent can take multiple actions all at once. It analyzes what's happening in the image concepts, the most compelling angles, and then boom, a single image becomes 16 unique videos. Today, I'm excited to announce that our first audio glasses will arrive this fall.
The world's leading electronics company, Samsung, is building innovative new devices and experiences that set the bar for the whole industry. And we've been working to bring the best of Google to these classes as well. These audio classes have brought together the world's top eyewear designers at gentle monster and Warby Parker.
They are designed to give you all day help with Gemini that is spoken into your ear privately, rather than shown on a display. Gemini can you actually put my usual order in at that coffee shop we just talked about. Sure I'll order you a Nitro Cold brew for pickup from Coupa cafe on DoorDash. Gemini is able to launch apps like DoorDash, then click through all the different options screens automatically to order her coffee.
I have prepared your order for the Nitro Cold brew from Coupa cafe. Would you like to confirm. Yes, please. All of these advances show the staggering pace of AI progress. It's incredible. We're in a moment of immense promise, but also enormous responsibility. The whole reason I've worked on AI my entire career was because I saw it as the ultimate tool to advance science and our understanding of the world.
I'm excited to announce Gemini for science. It brings together a number of powerful AI tools to help accelerate research. Our new labs prototypes streamline daily scientific tasks, whether it's staying on top of newly published papers, transforming research goals into usable code, or generating new hypotheses.
Google's cutting edge research and products will help unlock Aggies incredible potential for the benefit of the entire world. This technology will be a force multiplier for human ingenuity and usher in a new golden age of scientific discovery and progress, improving the lives of everyone everywhere. Thank you and enjoy the rest of Google I/O.

---

みなさん、ショアラインへようこそ、そして世界中からご覧の皆さんへ。今年のI/Oに戻ってこられて嬉しいです。本当に素晴らしい一年でした。私たちはAIイノベーションに対して差別化された「フルスタック」なアプローチを取っています。AIの普及規模を理解するために、もう一つ重要な指標があります。それがトークンです。

AIモデルが処理するデータの基本単位で、多くは解決されている問題を表しています。私たちは各サービス全体で月間9.7兆トークンを処理していました。そして今日時点では、その数字は7倍に跳ね上がり、月間3.2京（けい）トークンになっています。現在、10億人以上のユーザーを持つ製品が13個あります。そのうち5つは30億人以上のユーザーを持っています。

Geminiモデルは、より多くの人々が私たちの製品を使うようになった大きな理由であり、また使う頻度が増えた理由でもあります。AIオーバービューは現在、月間25億人以上のユーザーを抱えており、AIモードは大きな革命をもたらしました。わずか1年でサーチ史上最大のアップグレードとなり、すでに月間10億人以上のユーザーを超えています。

昨年のI/OではGeminiアプリの月間アクティブユーザーは4億人でしたが、今日は9億人を突破しました。1年で2倍以上になっています。

人々は毎日YouTubeにたくさんの質問をしに来ます。「Ask YouTube」はそのエクスペリエンスを根本から作り変えます。例えば、すでにバランスバイクに乗れる3歳の子に、ペダル付き自転車の乗り方を教えたいとしましょう。YouTubeに聞くだけでいいんです。

「Docs Live」では、頭の中にあることを口頭でまとめて話すだけで、あとはGeminiがやってくれます。さっき、明日OB・OGトーク会があることを思い出しました。ソフトウェアエンジニアとして何をしているか説明するためのトーキングポイントを考えないといけない。ドライブから履歴書を引っ張ってきてもらえる？……でも、それだとつまらないかな。面白い例え話を考えてくれる？あと、学校からメールが来てたと思うんだけど、そこから詳細を取得して、どこに行けばいいか・何時なのかをドキュメントの上に追加しておいて。

私たちはトレーニングインフラに対してまったく異なるアプローチを取っています。JAXとPathwaysによって、複数のサイトをまたいでトレーニングをシームレスに分散できるようになりました。世界中で1万以上のTPUをまたいでスケーリングできます。これにより、世界最大のトレーニングクラスターを作る能力を持つことができました。

このスピードの感覚をライブでお伝えするために、近日公開予定のFlashモデルでプロンプトをお見せします。もしTPUで動作していたとしたら、Chrome Dinoゲームを作るよう頼んでみます。送信ボタンを押します。レスポンスはリアルタイムで生成されています。右上のトークン毎秒の数字を見てください。そのスピードはかなり驚異的で、毎秒約1,500トークンです。リクエストを書くのにかかった時間より短いくらいで、ゲームもかなり楽しいです。

今日は特に深く掘り下げたい3つの分野があります。モデル・コーディング・エージェントにおける進歩をお見せします。

Gemini Omniを発表できることを嬉しく思います。あらゆる入力からあらゆるものを作り出せる新しいモデルです。GeminiのインテリジェンスとGoogleのメディア生成モデルの最良の部分を組み合わせて、世界理解・マルチモダリティ・編集において新たなレベルを実現しています。まずは動画から始めますが、時間が経つにつれてOmniはあらゆる入力からあらゆる出力を生成できるようになります。

生成AIが向上するにつれ、透明性の必要性も高まります。ローンチ以来、SynthIDはすでに1,000億枚以上の画像と動画にウォーターマークを入れています。より多くの人が簡単にこれらのツールにアクセスできるよう、SynthIDとコンテンツ認証の検証をSearchとChromeに拡大します。OpenAI、カカオ、Lemon Labsが本日SynthIDを採用することを発表できることを嬉しく思います。

Gemini 3.5 Flashを紹介できて嬉しいです。フロンティアのインテリジェンスとアクションを組み合わせた、シリーズ初のモデルです。3.1 Proと比較すると、Flashはあらゆる面で優れています。ほぼすべてのベンチマークで3.5 Flashはフロンティアで非常に優秀なモデルであり、最高クラスのモデルと同等ですが、はるかに高速です。

右上の象限で独自のリーグにいます。私たちは再設計されたエージェントファーストの開発プラットフォーム「anti-gravity」と共に3.5 Flashを使用しており、開発の速度が劇的に加速しました。新しいanti-gravityとGemini 3.5 Flashを使って、私たちのエージェントに非常に複雑で印象的なタスクに挑戦させました。12時間でゼロからオペレーティングシステムをビルドすることです。

93のサブエージェントが並列で動作し、15,000回以上のモデルリクエストを行い、26億トークンを処理して、最初は空だったプロジェクトから機能するオペレーティングシステムのコアを作り上げました。でも、Doomがプレイできないと本当のOSとは言えませんよね。今すぐDoomを動かそうとしてもうまくいきません。OSに必要なビデオとキーボードのドライバーが不足していることがわかりました。

プロンプトを用意してあります。貼り付けます。anti-gravityはかなりの調査を行い、100行以上のコードを書き、最終的にOSをビルドしました。覗いてみましょう、うまくいくか見てみましょう。真実の瞬間です。素晴らしい！これを可能にしたのは新しいサブエージェントチームワーク機能です。

Flashをanti-gravityで4倍ではなく12倍高速化しました。Gemini 3.5 Flashは本日、私たちの製品とAPI全体でみんなに利用可能になります。また3.5 Proも楽しみにしています。社内で使用しており、大きな改善が見られます。早く手に入れたいと思っているのはわかっています。来月までお待ちください。

Gemini 3.5とanti-gravityは、エージェントとエージェント機能の新しい世界を解放しています。私たちはエージェントのパワーを安全かつセキュアに消費者に届けることに非常に注力しており、誰もが使えるようにしたいと思っています。

Gemini Sparkをご紹介します。デジタルライフをナビゲートするのを助けるパーソナルAIエージェントです。あなたの代わりに、あなたの指示のもとで行動します。Google Cloud上の専用仮想マシンで動作し、24時間365日利用可能です。そう、ノートパソコンを閉じても大丈夫です。Gemini 3.5とGoogle anti-gravityハーネスによって動作しており、長時間のタスクをバックグラウンドで簡単に実行できます。

SparkはツールとシームレスにIntegrateし、まず私たちのツールから始まり、数週間以内にMCPを通じてサードパーティのツールにも対応します。大きなブロックパーティを計画していて、かなり複雑なプロンプトが必要です。RSVPをすべて取得して、誰が何を持ってくるかリストを管理して、まだサインアップしていないお隣の方々にメールすることを忘れずに。Sparkはステップごとに進んで、あなたが持っているさまざまなスキルやアプリを横断して作業します。

最初のものはライブのRSVPトラッカーです。Google Sheetsに書き込んでいます。そしてSparkは頭にあることをとにかくアウトプットするのが得意です。学年末までに妻と私が子どもたちのためにやらなければならないことのトップリストをドキュメントにまとめて。後で確認しましょう。

そして私たちはGoogle Searchの次の章に入ります。素晴らしいAI機能が単にSearchの中にあるだけでなく、Google SearchがAI Searchそのものになっています。今、この理想に向けた刺激的な一歩を踏み出しています。Searchの中で多くのタスクのために複数のAIエージェントを作成・管理できるようになります。まず、情報エージェントをバックグラウンドで24時間365日動かすことができ、これらはGemini Sparkと連携して、より多くのことを成し遂げる手助けをします。

例えば、あなたがファイナンスに興味があって、ポジティブなキャッシュフローが15未満で負債が低い大型バイオテクについてもっと知りたいとします。リアルタイムの財務データに直接接続するので、株価のリアルタイム更新と、市場が動いた瞬間のインサイトを得られます。そうなったとき、エージェントはインテリジェントかつ合成された更新を送ってくれます。何が起きているかを理解して、シグナルとノイズを切り分けるのを助けてくれます。

これでSearchはカスタムのステートフルなエクスペリエンス・ツール・トラッカー・ダッシュボードを丸ごと構築する能力を持つようになりました。特に何度も戻ってきたい長期タスクに最適です。Searchは積極的に私のために週末プランナーを構築することを提案し、Gmail・写真・カレンダーを安全に接続することを選びました。そしてドーン、完成です。準備できているようです。下には、クールなレストラン予約が地図上に美しくレイアウトされています。

人々は毎日Google全体で10億回以上ショッピングしています。ショッピンググラフのスケールと高度なGeminiモデルを組み合わせると、まったく新しい買い物の方法が生まれます。エージェントeコマースに関して、3つの重要なビルディングブロックを届けることに注力しています。まず、Universal Commerce Protocol（UCP）、次に、Agent Payment Protocol（AP2）、そして最後のビルディングブロックは、Universal Cart—本当にインテリジェントなショッピングカートです。

商品を追加した瞬間から、カートはバックグラウンドであなたのために動き始めます。もう一つのゲームチェンジャーは、インテリジェントな推論の適用方法です。例えば、初めて自作PCを組み立てているとします。レビューの高いマザーボードを見つけてカートに追加します。すでにプロセッサーを選んでいますが、気づいていなかったのは、そのプロセッサーには異なるソケットタイプのマザーボードが必要だということです。カートがこれを検知して、代替品を提案してくれます。見落としていた問題を未然に防いでくれるわけです。

今日はGeminiで盛りだくさんの一日でした。Neural Expressiveでエクスペリエンス全体を完全に再設計しました。新しいGemini OmniモデルとFlash 3.5モデルを出荷し、3.5 Proも間もなく、そしてDailyブリーフのような新機能のおかげでGeminiを活用できるようになりました。

Daily Briefは個人向けのダイジェストで、毎朝の最初のストップになるように設計されています。受信トレイ・カレンダー・タスクから情報を統合して、私が知っておくべき最も重要なことを見つけ出してくれます。そしてGemini Spark—ショーの最初にいくつかのタスクを送りましたね。確認しましょう。これは学年末のチェックリストで、今年の終わりまでに忘れたくないことのドキュメントを作るよう頼みました。開けてみます。Google Docsのフォーマットを活用しているので、すぐにクリックして編集できます。

あなたがデザイナーでも、起業家でも、アーティストでも、私たちの製品はアイデアが浮かんだ瞬間からそれを創造するまでの距離を縮める手助けをします。テクノロジーは最高の状態では、人間の創造性のキャンバスです。

Google Picksをご紹介します。Google Workspaceの新製品で、欲しいクリエイティブコントロールを使ってほぼ何でも作れる画像作成・編集ツールです。要素にカーソルを合わせてクリックするだけで削除できます。フレームに合わせてオブジェクトをリサイズしたり、テキストを追加・編集したり、数クリックですべてを翻訳したりできます。

Google Flowは昨年のI/Oで発表しました。Flowは一度に一つのプロンプトしか実行できませんでした。今では、エージェントが複数のアクションを同時に取れるようになりました。画像の中で起きていることを分析し、最も魅力的なアングルのコンセプトを出し、そして一枚の画像が16のユニークなビデオになります。

本日、私たちの最初のオーディオグラスが今秋発売されることを発表できることを嬉しく思います。世界をリードするエレクトロニクス企業のSamsungが、業界全体の基準を打ち立てる革新的な新デバイスとエクスペリエンスを構築しています。私たちはこれらのグラスにGoogleの最高のものを持ち込むためにも取り組んできました。

これらのオーディオグラスは、Gentle MonsterとWarby Parkerの世界トップのアイウェアデザイナーが集まって設計しました。ディスプレイに表示されるのではなく、プライベートに耳に語りかけてくれるGeminiによる一日中のサポートを提供するように設計されています。

「Gemini、さっき話したコーヒーショップにいつものオーダーを入れてもらえる？」「もちろん、DoorDashのCoupa CaféでNitro Cold Brewのピックアップを注文します。」GeminiはDoorDashのようなアプリを起動し、コーヒーを注文するためにさまざまなオプション画面を自動的にクリックして進みます。「Coupa CaféからNitro Cold Brewの注文を準備しました。確認しますか？」「はい、お願いします。」

これらすべての進歩がAI進歩の驚異的なペースを示しています。本当に素晴らしいです。私たちは非常に大きな可能性を持つ瞬間にいますが、同時に大きな責任も伴っています。私がキャリア全体でAIに取り組んできた理由は、科学を進歩させ、世界についての理解を深める究極のツールになると見ていたからです。

Gemini for Scienceを発表できることを嬉しく思います。研究を加速するための多くの強力なAIツールをまとめています。新しいラボプロトタイプは、新しく公開された論文を追いかけることから、研究目標を実用的なコードに変換すること、新しい仮説を生成することまで、日々の科学的タスクを効率化します。

Googleの最先端の研究と製品は、世界全体の利益のためにAIの信じられない可能性を解き放つ手助けをします。この技術は人間の創意工夫の力を増幅させ、科学的発見と進歩の新しい黄金時代を到来させ、世界中のすべての人の生活を向上させるでしょう。ありがとう、そしてGoogle I/Oの残りをお楽しみください。
