import { observable, action } from 'mobx';

class ContentStore {
  @observable
  title =
    'Apple board members have been sued four times now over Q1 2019 guidance';

  @observable
  link = '';

  @observable
  content =
    '<img src="https://9to5mac.com/wp-content/uploads/sites/6/2019/12/Mac-Pro-Top-Features-slight-angle-jeff.jpg?quality=82&strip=all" referrerpolicy="no-referrer"> <p>Apple has updated the <a href="https://www.apple.com/shop/buy-mac/mac-pro/tower#">Mac Pro configurator</a> to include a new 8TB SSD option. This configuration was initially listed as coming soon when Mac Pro orders first began last week.</p> <p><span id="more-625364"></span> <!-- author ad --> </p><p></p> <p>The 8TB SSD option for the Mac Pro comes at an added cost of $2,600 compared to the base 256GB configuration. For comparison’s sake, the 8TB upgrade in the 16-inch MacBook Pro costs $2,400 extra compared to the base 512GB tier. For those keeping track, that brings the maximum price of the 2019 Mac Pro to $53,799.</p> <p>Apple still lists two additional graphics card options that are also coming soon for the Mac Pro:</p> <ul> <li>Radeon Pro W5700X with 16GB of GDDR6 memory</li> <li>Two Radeon Pro W5700X with 16GB of GDDR6 memory each</li> </ul> <p>In addition to those graphics card configurations, the rack mount version of the Mac Pro is also still listed as coming soon on Apple’s website. It’s still unclear how “soon” that option will come, though.</p> <p>The Mac Pro wasn’t originally announced as having an 8TB configuration, but when the 16-inch MacBook Pro was announced with the option, Apple quietly added it to the Mac Pro as well.</p> <p>As <a href="https://9to5mac.com/2019/12/19/top-2019-mac-pro-features-plenty-of-room-for-growth-video/">Jeff Benjamin explained</a> in his look at the best Mac Pro features, the SSD is one area that is not directly upgradable by the user after purchase. That being said, you could rely on PCIe storage options to expand after purchase.</p> <p><strong>Read more about the Mac Pro: </strong></p> <ul> <li><a href="https://9to5mac.com/2019/12/16/how-to-upgrade-mac-pro-ram-save-money-video/">How to upgrade Mac Pro RAM and save lots of money [Video]</a></li> <li><a href="https://9to5mac.com/2019/12/18/mac-pro-teardown-testing-16k-video-more/">YouTubers walk through Mac Pro teardown and test Afterburner effect on base configuration with 16K video</a></li> <li><a href="https://9to5mac.com/2019/12/16/apples-assembled-in-usa-mac-pro-is-made-in-china-for-international-customers/">Apple’s ‘Assembled in USA’ Mac Pro is made in China for international customers</a></li> <li><a href="https://9to5mac.com/2019/12/19/top-2019-mac-pro-features-plenty-of-room-for-growth-video/">Top 2019 Mac Pro features: plenty of room for growth [Video]</a></li> </ul> <p><em>Thanks, <a href="https://twitter.com/yosefitche/status/1207750934631243777">Yossi</a>!</em></p> <div class="ad-disclaimer-container"><p class="disclaimer-affiliate"><em>FTC: We use income earning auto affiliate links.</em> <a href="https://9to5mac.com/about/#affiliate">More.</a></p><a href="http://bit.ly/36GEt6i" target="_blank" rel="noopener"><img class="alignnone wp-image-625102" title="Pocketalk translation device" src="https://9to5mac.com/wp-content/uploads/sites/6/2019/12/Pocketalk_9to5Mac_Banner_750x150_B2.jpg?quality=82&strip=all" alt="Pocketalk translation device" width="750" height="150" referrerpolicy="no-referrer"></a></div><p><!-- youtube embed --></p>';

  @action
  setConetnt(newTitle: string, newContent: string, link: string) {
    this.title = newTitle;
    this.content = newContent;
    this.link = link;
  }
}

const store = new ContentStore();

export default store;
