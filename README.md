# Think Smart — README

**Live site:** https://29adarsh.pythonanywhere.com/

---

## What is this site?
Think Smart is a blog platform that showcases articles across multiple categories (Fashion, Food, Health & Fitness, Photography, Technology, Travel and more). It lets visitors browse trending posts, explore posts by category or author, subscribe to a newsletter, and contact the site owner. The site appears as a modern, content-focused blog with a homepage featuring trending posts and category links.

## Key pages & features
- **Home** — Landing page with a short intro and links to explore blogs.
- **Blogs** — List of blog posts; individual blog pages with content and images.
- **Trending** — Curated or algorithmically surfaced trending posts.
- **Categories** — Browse posts grouped by category (Fashion, Food, Health & Fitness, Photography, Technology, Travel).
- **Authors** — View posts by author.
- **About** — About the site / author section.
- **Contact** — A contact form / contact information page.
- **Login / Admin** — User authentication and admin access for content management.
- **Newsletter subscribe** — Simple email capture form on the homepage/footer.

> Footer note found on the live site: “© 2025 Think Smart. Made with ❤️ by Adarsh.”

## Technologies (recommended / likely)
The project is a typical Django-based blog and is deployed on PythonAnywhere. It uses standard front-end building blocks such as HTML, CSS, JavaScript and Bootstrap for responsive layout. Suggested tech stack:
- **Backend:** Django (Python)
- **Frontend:** HTML, CSS, Bootstrap, JavaScript
- **Database:** SQLite by default (or MySQL/PostgreSQL in production)
- **Hosting:** PythonAnywhere (live site shown above)

> Note: adjust the stack in this README if your project uses a different stack or additional libraries.

## Installation & local development (example)
> These are example steps — update paths and commands to match your repository.

1. **Clone the repo**
```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. **Create & activate virtualenv**
```bash
python3 -m venv venv
source venv/bin/activate   # macOS / Linux
# venv\Scripts\activate   # Windows
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
- Create a `.env` or export variables for `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, and database credentials (if using MySQL/Postgres).

5. **Database migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Create superuser**
```bash
python manage.py createsuperuser
```

7. **Collect static files (for production)**
```bash
python manage.py collectstatic
```

8. **Run the dev server**
```bash
python manage.py runserver
# open http://127.0.0.1:8000
```

## Deployment notes (PythonAnywhere)
- Push your code to GitHub and then pull into PythonAnywhere, or use the web console to deploy.
- Ensure your virtualenv on PythonAnywhere has the same packages installed.
- Configure the WSGI file to point to your Django project.
- Run `collectstatic`, and configure the static files section in the PythonAnywhere web app settings.
- Update `ALLOWED_HOSTS` to include your PythonAnywhere domain.

## Recommended improvements / TODOs
- Fix or replace broken image links and ensure uploaded media serves correctly.
- Implement pagination on blog lists.
- Add search functionality.
- Improve the Newsletter: integrate with a real mail provider (Mailchimp, SendGrid) and implement double opt-in.
- Add social sharing buttons on individual posts.
- Implement better error pages (404, 500) and form validation on contact page.

## Screenshots
Add screenshots to the repository under `/screenshots` and include them in the README. Example:
```markdown
![Homepage](/screenshots/homepage.png)
![Blog post](/screenshots/post.png)
```

## Contribution
If you want to contribute:
- Fork the repo
- Create a feature branch
- Open a pull request describing your changes

## License
Add your preferred license (e.g., MIT). If you need a license template, include an `LICENSE` file and add a short summary in this README.

## Contact
Project maintained by Adarsh. Update the `Contact` page or README with the best email/social link.

---

*README generated based on the live site at https://29adarsh.pythonanywhere.com/ — update this document with exact tech / dependency details from your repository.*

