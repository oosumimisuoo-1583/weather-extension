// 最新のXcratch仕様に合わせたお天気拡張機能
class WeatherExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'simpleWeather2026',
            name: 'お天気予報',
            blocks: [
                {
                    opcode: 'getWeatherText',
                    blockType: 'reporter',
                    text: '東京の天気'
                }
            ]
        };
    }

    async getWeatherText() {
        try {
            const response = await fetch('https://jma.go.jp');
            const data = await response.json();
            return data.text.split('\n')[0]; // 最初の1行（「晴れ」など）だけをスッキリ返す
        } catch (error) {
            return 'エラー';
        }
    }
}

// Xcratchの最新ルール：最後は「export default」で締めくくる必要があります
export default WeatherExtension;


