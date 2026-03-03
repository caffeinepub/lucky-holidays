import { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9663202989',
      href: 'tel:9663202989',
      description: 'Call us anytime for bookings',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'lakkiholidays@gmail.com',
      href: 'mailto:lakkiholidays@gmail.com',
      description: 'Send us your queries',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon – Sun: 7 AM – 9 PM',
      href: null,
      description: 'We\'re available all week',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Ready to plan your next adventure? Get in touch with us and we'll make it happen.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
                Get In Touch
              </h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((info) => (
                  <Card key={info.label} className="border-border shadow-card">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-display font-semibold text-lg text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-display font-semibold text-lg text-foreground">{info.value}</p>
                        )}
                        <p className="text-sm text-muted-foreground font-body mt-0.5">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:9663202989"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold py-3 px-6 rounded-full transition-colors shadow-md"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                <a
                  href="mailto:lakkiholidays@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold py-3 px-6 rounded-full transition-colors shadow-md"
                >
                  <Mail size={18} />
                  Send Email
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border shadow-card">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MessageSquare size={20} className="text-primary" />
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground">Send Us a Message</h2>
                  </div>

                  {submitted ? (
                    <div className="text-center py-10">
                      <CheckCircle size={56} className="text-primary mx-auto mb-4" />
                      <h3 className="font-display font-bold text-xl text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground font-body mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="font-body rounded-full border-primary text-primary hover:bg-primary/10"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Label htmlFor="name" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`font-body ${errors.name ? 'border-destructive' : ''}`}
                        />
                        {errors.name && <p className="text-destructive text-xs mt-1 font-body">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`font-body ${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="font-body"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your travel plans, preferred dates, number of passengers..."
                          rows={5}
                          className={`font-body resize-none ${errors.message ? 'border-destructive' : ''}`}
                        />
                        {errors.message && <p className="text-destructive text-xs mt-1 font-body">{errors.message}</p>}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold py-3 rounded-full"
                      >
                        <Send size={16} className="mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
