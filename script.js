(function() {
  'use strict';

  const translations = {
    'How do': 'どのように', 'How is': 'どのようです', 'What do': '何を', 'What is': '何です', 
    'When do': 'いつ', 'When is': 'いつです', 'Where do': 'どこで', 'Where is': 'どこです',
    'Who do': '誰が', 'Who is': '誰です', 'Why do': 'なぜ', 'Why is': 'なぜです',
    'If': 'もし', 'Because': 'なぜなら',
    'I': '私は', 'You': 'あなたは', 'They': '彼らは', 'We': '私たちは',
    'The cat': '猫は', 'The dog': '犬は',
    'am': 'です', 'is': 'です', 'are': 'です', 'was': 'でした', 'were': 'でした',
    'eat': '食べます', 'like': '好きです', 'run': '走ります', 'study': '勉強します',
    'happy': '幸せ', 'sad': '悲しい', 'tired': '疲れた', 'excited': 'わくわくした',
    'an apple': 'りんごを', 'a book': '本を',
    'at home': '家で', 'in the park': '公園で', 'at school': '学校で', 'in the office': 'オフィスで',
    'now': '今', 'yesterday': '昨日', 'tomorrow': '明日', 'last week': '先週', 'next month': '来月',
    'by bike': '自転車で', 'with Ken': 'ケンと一緒に', 'early': '早く',
    'because of': 'のために', 'to live': '住むために', 'for the test': 'テストのために', 'because': 'なぜなら',
    'ate': '食べました', 'liked': '好きでした', 'ran': '走りました', 'studied': '勉強しました',
    'eating': '食べています', 'running': '走っています', 'studying': '勉強しています',
    'have eaten': '食べました', 'have liked': '好きでした', 'have run': '走りました', 'have studied': '勉強しました',
    'is eaten': '食べられます', 'is liked': '好かれます', 'is studied': '勉強されます'
  };

  const translateSentence = (eng) => {
    const words = eng.split(' ').filter(word => word !== '');
    let japaneseWords = [];
    let i = 0;
    while (i < words.length) {
      if (i < words.length - 2 && translations[words.slice(i, i+3).join(' ')]) {
        japaneseWords.push(translations[words.slice(i, i+3).join(' ')]);
        i += 3;
      } else if (i < words.length - 1 && translations[words.slice(i, i+2).join(' ')]) {
        japaneseWords.push(translations[words.slice(i, i+2).join(' ')]);
        i += 2;
      } else if (translations[words[i]]) {
        japaneseWords.push(translations[words[i]]);
        i++;
      } else {
        // 翻訳がない場合は英語をそのまま使用
        japaneseWords.push(words[i]);
        i++;
      }
    }
    return japaneseWords.join(' ');
  };

  const SentenceBuilder = () => {
    const [sentence, setSentence] = React.useState({
      はてな: '',
      誰が何が: '',
      'する（です）': '',
      誰何: '',
      どこ: '',
      いつ: '',
      どのようにして: '',
      なぜ: ''
    });

    const [output, setOutput] = React.useState({
      english: '',
      japanese: ''
    });

    const options = {
      はてな: ['How do', 'How is', 'What do', 'What is', 'When do', 'When is', 'Where do', 'Where is', 'Who do', 'Who is', 'Why do', 'Why is', 'If', 'Because'],
      誰が何が: ['I', 'You', 'They', 'We', 'The cat', 'The dog'],
      'する（です）': ['am', 'is', 'are', 'was', 'were', 'eat', 'like', 'run', 'study', 'ate', 'liked', 'ran', 'studied', 'eating', 'running', 'studying', 'have eaten', 'have liked', 'have run', 'have studied', 'is eaten', 'is liked', 'is studied'],
      誰何: ['happy', 'sad', 'tired', 'excited', 'an apple', 'a book'],
      どこ: ['at home', 'in the park', 'at school', 'in the office'],
      いつ: ['now', 'yesterday', 'tomorrow', 'last week', 'next month'],
      どのようにして: ['by bike', 'with Ken', 'early'],
      なぜ: ['because of', 'to live', 'for the test', 'because']
    };

    const handleChange = (event, type) => {
      setSentence(prevSentence => ({ ...prevSentence, [type]: event.target.value }));
    };

    const buildSentence = () => {
      return Object.values(sentence).filter(value => value !== '').join(' ').trim();
    };

    React.useEffect(() => {
      const englishSentence = buildSentence();
      const japaneseSentence = translateSentence(englishSentence);

      setOutput({
        english: englishSentence,
        japanese: japaneseSentence
      });
    }, [sentence]);

    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement('h1', null, '楽しく学ぼう！英文メーカーwith Mr.Tanaka'),
      React.createElement(
        'div',
        { className: 'boxes' },
        Object.keys(sentence).map(key => 
          React.createElement(
            'div',
            { key: key, className: 'box' },
            React.createElement('div', { className: 'box-label' }, key),
            React.createElement('div', { className: 'box-content' }, sentence[key])
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'grid' },
        Object.entries(options).map(([key, values]) =>
          React.createElement(
            'div',
            { key: key },
            React.createElement('label', null, key),
            React.createElement(
              'select',
              {
                value: sentence[key],
                onChange: (e) => handleChange(e, key)
              },
              React.createElement('option', { value: '' }, '入れてね'),
              values.map((value) =>
                React.createElement('option', { key: value, value: value }, value)
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'result' },
        React.createElement('h2', null, '完成した文:'),
        React.createElement('p', null, React.createElement('strong', null, '英文:'), ' ', output.english),
        React.createElement('p', null, React.createElement('strong', null, '日本語訳:'), ' ', output.japanese)
      )
    );
  };

  ReactDOM.render(React.createElement(SentenceBuilder), document.getElementById('root'));
})();