import {link} from '../lib/url';
import {PageHero} from '../components/PageHero';

export function NotFound() {
  return (
    <PageHero label="Page not found" lines={[{t: 'Lost?'}, {t: 'Let’s fix that.', i: true}]} intro="We couldn’t find that page. It may have moved." photo="glossy-layers">
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={link('/')} className="btn">
          Back to home
        </a>
        <a href={link('/services/')} className="btn btn-line text-paper">
          Services & prices
        </a>
      </div>
    </PageHero>
  );
}
