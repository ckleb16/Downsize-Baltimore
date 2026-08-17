export type Testimonial = {
  quote: string;
  attribution: string;
  stars: number;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

function TestimonialCard({ testimonial, duplicate = false }: { testimonial: Testimonial; duplicate?: boolean }) {
  return (
    <blockquote className="testimonial-card" aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : 0}>
      <span className="testimonial-card__stars" aria-label={`${testimonial.stars} out of 5 stars`}>{"★".repeat(testimonial.stars)}</span>
      <p>“{testimonial.quote}”</p>
      <cite>{testimonial.attribution}</cite>
    </blockquote>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="testimonial-reserve" aria-label="Kind Words From People I've Helped">
      <div><p className="eyebrow">A quiet place for client perspective</p><h2>Kind Words From People I’ve Helped</h2></div>
      <div className="testimonial-marquee">
        <div className="testimonial-marquee__track">
          {testimonials.map((testimonial) => <TestimonialCard key={`${testimonial.attribution}-${testimonial.quote}`} testimonial={testimonial} />)}
          {testimonials.map((testimonial) => <TestimonialCard key={`duplicate-${testimonial.attribution}-${testimonial.quote}`} testimonial={testimonial} duplicate />)}
        </div>
      </div>
    </section>
  );
}
