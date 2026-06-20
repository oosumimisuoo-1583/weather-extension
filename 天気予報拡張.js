class WeatherExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'weatherApiExtension',
            name: 'お天気予報',
            blocks: [
                {
                    opcode: 'getWeather',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[AREA] の天気を調べる',
                    arguments: {
                        AREA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '130000', // 初期値：東京都
                            menu: 'areaMenu'
                        }
                    }
                }
            ],
            menus: {
                areaMenu: {
                    acceptReporters: true,
                    items: [
                        { text: '北海道（石狩・空知・後志）', value: '016000' },
                        { text: '宮城県', value: '040000' },
                        { text: '東京都', value: '130000' },
                        { text: '神奈川県', value: '140000' },
                        { text: '愛知県', value: '230000' },
                        { text: '大阪府', value: '270000' },
                        { text: '広島県', value: '340000' },
                        { text: '福岡県', value: '400000' },
                        { text: '沖縄県（本島地方）', value: '471000' }
                    ]
                }
            }
        };
    }

    async getWeather(args) {
        const areaCode = args.AREA;
        const url = `https://jma.go.jp{areaCode}.json`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                return 'データが見つかりません';
            }
            const data = await response.json();
            
            // 気象庁APIのデータ構造から最新の天気テキストを抽出
            const weatherText = data[0].timeSeries[0].areas[0].weathers[0];
            return weatherText;
        } catch (error) {
            console.error(error);
            return 'エラーが発生しました';
        }
    }
}

// Xcratch等の環境に登録
Scratch.extensions.register(new WeatherExtension());
