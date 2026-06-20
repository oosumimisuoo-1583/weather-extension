class WeatherExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'simpleWeather',
            name: 'お天気予報',
            blocks: [
                {
                    opcode: 'getWeatherText',
                    blockType: 'reporter', // エラーの原因になりやすい部分を安全な文字列に変更
                    text: '東京の天気'
                }
            ]
        };
    }

    async getWeatherText() {
        try {
            // 気象庁の東京の天気データを取得
            const response = await fetch('https://jma.go.jp');
            const data = await response.json();
            // 予報のテキスト（最初の1行）を返す
            return data.text.split('\n')[0];
        } catch (error) {
            return 'エラーが発生しました';
        }
    }
}

// 登録処理
if (window.Scratch) {
    window.Scratch.extensions.register(new WeatherExtension());
} else if (window.vm) {
    // 異なる環境（Stretch3など）にも対応する安全な記述
    window.vm.extensionManager.registerExtensionInstance(new WeatherExtension());
} else {
    // Xcratchの標準的な登録
    Scratch.extensions.register(new WeatherExtension());
}

