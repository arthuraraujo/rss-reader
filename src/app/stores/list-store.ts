import { observable, action } from 'mobx';
import Parser from 'rss-parser';

const parser = new Parser();

function getThumbnail(content: string): string {
  const regex = /<img[^>]+src="([^">]+)"/;

  if (regex.test(content)) {
    const res = regex.exec(content);
    if (res && res.length > 1) {
      return res[1];
    }
  }

  return '';
}

export interface NewsItem {
  title: string;
  contentSnippet: string;
  link: string;
  guid: string;
  pubDate: string;
  content: string;
  thumbnail?: string;
}

class ListStore {
  @observable
  source = '9to5';

  @observable
  url = 'https://rsshub.app/9to5/mac';

  @observable
  data: NewsItem[] = [];

  @action
  async loadData() {
    let feed = await parser.parseURL('https://rsshub.app/9to5/mac');

    console.log(feed.items);

    const newData: NewsItem[] = (feed.items || []).map((item: NewsItem) => {
      const thumbnail = getThumbnail(item.content);

      return {
        ...item,
        thumbnail,
      };
    });

    this.data = newData;
  }
}

const store = new ListStore();

export default store;
