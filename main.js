const images = [
  '../Img/img2.jpg',
  '../Img/DDD.jpg',
  '../Img/FFF.jpg',
  '../Img/img1.jpg',
];

const slideshow = document.getElementById('slideshow');

// Créer une div par image
if (slideshow) {
  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.backgroundImage = `url('${src}')`;
    if (i === 0) slide.classList.add('active');
    slideshow.insertBefore(slide, slideshow.firstChild);
  });

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

  //Effet de Reveal and Scroll sur la section d'aperçu

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Implementation du système d'onglets dans la page formation
function showFiliere(id) {
    document.querySelectorAll('.filiere-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.filiere p').forEach(el => el.classList.remove('active'));

    document.getElementById(id).style.display = 'block';

    if (id === 'industrielle') document.querySelector('.f1').classList.add('active');
    if (id === 'tertiaire') document.querySelector('.f2').classList.add('active');
}

/*Champ de saisie (apparait lorsque l'utilisateur clique sur le motif autre - page contact) */
  function verifier(select) {
    const champAutre = document.getElementById('motif-autre');
    if (select.value === 'autre') {
      champAutre.style.display = 'block';
    } else {
      champAutre.style.display = 'none';
    }
  }

/*========== Assistant flottant GEIGE — fenêtre de discussion ==========*/
(function () {
  'use strict';

  var btn = document.querySelector('.assistant-btn');
  if (!btn) return;

  var STORE_KEY = 'geige-assistant-historique';
  var TEASER_KEY = 'geige-assistant-bulle';
  var MAX_MSGS = 60;

  /* ---------- Informations officielles de l'école ---------- */
  var ECOLE = {
    tel: '(+225) 01 73 29 48 90',
    telHref: 'tel:+2250173294890',
    email: 'geige20@gmail.com',
    emailHref: 'mailto:geige20@gmail.com',
    adresse: 'Rues Des Jardins, Face Station Corlay - Deux-plateaux - Vallon Cocody',
    horaires: 'Lundi - Vendredi : 8h00 - 17h00\nSamedi : 8h00 - 12h00\nDimanche : fermé',
    brochure: './pdf/GEIGE PROSPECTUS 2.pdf'
  };

  /* ---------- Puces de suggestion ---------- */
  function ask(label, say) { return { label: label, say: say }; }
  function go(label, href) { return { label: label, href: href }; }

  var MENU = [
    ask('🎓 Formations', 'Quelles formations proposez-vous ?'),
    ask('💰 Tarifs', 'Quels sont les tarifs ?'),
    ask('📝 Inscription', 'Comment faire une inscription ?'),
    ask('📞 Coordonnées', 'Comment vous contacter ?')
  ];

  var FILIERES = [
    ask('Industrielles', 'Présentez-moi les filières industrielles'),
    ask('Tertiaires', 'Présentez-moi les filières tertiaires'),
    go('Voir la page Formations', './formations.html')
  ];

  var CONTACT = [
    ask('🗓 Horaires', 'Quels sont vos horaires ?'),
    ask('📍 Adresse', 'Où êtes-vous situés ?'),
    go('📞 Appeler', ECOLE.telHref),
    go('Formulaire', './contact.html')
  ];

  /* ---------- Message d'accueil selon la page ---------- */
  function nomPage() {
    var p = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p === '' ? 'index.html' : p;
  }

  function bienvenue() {
    var p = nomPage();
    if (p.indexOf('formation') === 0) {
      return {
        text: 'Bonjour 👋 Bienvenue dans nos formations !\nJe peux vous présenter nos filières industrielles et tertiaires, les diplômes (BTS / Licence Professionnelle) ou les modalités d’inscription.',
        chips: FILIERES
      };
    }
    if (p.indexOf('contact') === 0) {
      return {
        text: 'Bonjour 👋 Une question pour GEIGE ?\nJe vous donne nos horaires, notre adresse et nos coordonnées — ou posez votre question librement.',
        chips: CONTACT
      };
    }
    return {
      text: 'Bonjour 👋 Je suis l’assistant GEIGE 🤖\nFormations, tarifs, inscriptions, horaires, contacts : je réponds à vos questions.',
      chips: MENU
    };
  }

  /* ---------- Textes de la base de connaissances ---------- */
  var INDUSTRIELLES = 'Nos filières industrielles :\n• Informatique Développement d’Applications (IDA)\n• Réseau Informatique et Télécommunication (RIT)\n• Génie Logiciel (GL)';
  var TERTIAIRES = 'Nos filières tertiaires :\n• Finance Comptabilité et Gestion d’Entreprise\n• Gestion Commerciale\n• Ressources Humaines et Communication (RHCOM)\n• Contrôle de Gestion et Audit\n• Ingénierie Financière\n• Marketing Management\n• Gestion des Ressources Humaines';

  /* ---------- Règles de réponse (mots-clés → réponse) ---------- */
  var RULES = [
    {
      kw: ['salut', 'bonjour', 'bonsoir', 'hello', 'coucou', 'hey', 'bonne journee', 'ca va'],
      reply: function () {
        return {
          text: 'Bonjour 👋 Ravi de vous aider !\nQue souhaitez-vous savoir sur GEIGE ?',
          chips: MENU
        };
      }
    },
    {
      kw: ['merci', 'thanks', 'genial', 'super', 'parfait'],
      reply: function () {
        return { text: 'Avec plaisir 😊\nN’hésitez pas si vous avez d’autres questions.', chips: MENU };
      }
    },
    {
      kw: ['au revoir', 'a bientot', 'bye', 'a plus'],
      reply: function () {
        return { text: 'À bientôt 👋 Je reste disponible si une question revient.', chips: MENU };
      }
    },
    {
      kw: ['qui es tu', 'qui es vous', 'tu es qui', 'vous etes qui', 'qui etes vous', 'presente toi', 'presentez vous', 'tu fais quoi', 'que fais tu', 'que peux tu faire', 'comment ca marche', 'c est quoi geige', 'geige c est quoi', 'aide', 'help', 'menu', 'options'],
      reply: function () {
        return {
          text: 'Je suis l’assistant virtuel de GEIGE 🤖\nJe vous renseigne sur :\n• nos formations et filières\n• les inscriptions et les tarifs\n• les horaires et nos coordonnées',
          chips: MENU
        };
      }
    },
    {
      kw: ['a propos', 'apropos de geige', 'qui somme', 'histoire', 'valeurs', 'pedagogie', 'projet pedagogique'],
      reply: function () {
        return {
          text: 'GEIGE (Grande Ecole d’Informatique et de Gestion d’Entreprise) est une école privée d’excellence : programmes modernes, encadrement de qualité, théorie et pratique réunies pour préparer nos étudiants au monde professionnel.',
          chips: [go('Nos formations', './formations.html'), ask('Vos chiffres', 'Quels sont vos chiffres ?')]
        };
      }
    },
    {
      kw: ['filiere industrielle', 'industriel', 'industrielle', 'ida'],
      reply: function () {
        return {
          text: INDUSTRIELLES + '\n\nCes parcours allient théorie et pratique.',
          chips: [ask('Filières tertiaires', 'Présentez-moi les filières tertiaires'), go('Voir la page', './formations.html')]
        };
      }
    },
    {
      kw: ['filiere tertiaire', 'tertiaire'],
      reply: function () {
        return {
          text: TERTIAIRES + '\n\nDes formations pratiques, axées sur l’employabilité.',
          chips: [ask('Filières industrielles', 'Présentez-moi les filières industrielles'), go('Voir la page', './formations.html')]
        };
      }
    },
    {
      kw: ['informatique', 'developpement', 'developpeur', 'programmation', 'logiciel', 'coder', 'application mobile', 'digital'],
      reply: function () {
        return {
          text: 'Deux filières vous concernent :\n• Informatique Développement d’Applications (IDA) — concevoir des applications\n• Génie Logiciel (GL) — analyse, conception et développement de logiciels\n\nLa filière RIT complète le côté infrastructure (réseaux).',
          chips: [ask('Voir toutes les filières', 'Quelles filières proposez-vous ?'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['reseau', 'reseaux', 'telecom', 'telecommunication', 'cybersecurite', 'internet', 'serveur'],
      reply: function () {
        return {
          text: 'La filière Réseau Informatique et Télécommunication (RIT) forme des spécialistes capables d’installer, configurer et administrer les réseaux et les systèmes de télécommunication.\n\nElle fait partie de nos filières industrielles.',
          chips: [ask('Filières industrielles', 'Présentez-moi les filières industrielles'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['finance', 'comptabilite', 'compta', 'audit', 'controle de gestion', 'ingenierie financiere', 'investissement', 'fcge'],
      reply: function () {
        return {
          text: 'Côté tertiaire, plusieurs filières financières :\n• Finance Comptabilité et Gestion d’Entreprise (FCGE)\n• Contrôle de Gestion et Audit\n• Ingénierie Financière',
          chips: [ask('Voir toutes les filières', 'Quelles filières proposez-vous ?'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['commerce', 'commercial', 'marketing', 'vente', 'relation client', 'publicite'],
      reply: function () {
        return {
          text: 'Deux filières tertiaires vous concernent :\n• Gestion Commerciale — commerce, vente, relation client\n• Marketing Management — marketing, communication, gestion commerciale',
          chips: [ask('Voir toutes les filières', 'Quelles filières proposez-vous ?'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['ressource humaine', 'ressources humaines', 'gestion des rh', 'rhcom', 'recrutement', 'gestion du personnel'],
      reply: function () {
        return {
          text: 'Deux filières tertiaires dédiées aux humains et à la communication :\n• Ressources Humaines et Communication (RHCOM)\n• Gestion des Ressources Humaines',
          chips: [ask('Voir toutes les filières', 'Quelles filières proposez-vous ?'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['filiere', 'filiieres', 'specialite', 'specialites', 'domaine', 'choisir'],
      reply: function () {
        return {
          text: INDUSTRIELLES + '\n\n' + TERTIAIRES + '\n\nLaquelle vous intéresse ?',
          chips: FILIERES
        };
      }
    },
    {
      kw: ['formation', 'formations', 'cours', 'programme', 'enseignement', 'apprendre', 'etudier', 'etudes', 'apprentissage'],
      reply: function () {
        return {
          text: 'GEIGE propose des formations en BTS et Licence Professionnelle, réparties en deux groupes :\n\n' + INDUSTRIELLES + '\n\n' + TERTIAIRES + '\n\nQuelle filière vous intéresse ?',
          chips: FILIERES
        };
      }
    },
    {
      kw: ['bts', 'licence', 'diplome', 'niveau', 'duree', 'combien de temps', 'certificat'],
      reply: function () {
        return {
          text: 'GEIGE prépare à deux niveaux de diplôme :\n• BTS (Brevet de Technicien Supérieur)\n• Licence Professionnelle\n\nLa durée et les conditions dépendent de la filière choisie : la brochure contient tous les détails.',
          chips: [go('📥 Télécharger la brochure', ECOLE.brochure), ask('Quelles filières ?', 'Quelles filières proposez-vous ?'), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['tarif', 'tarifs', 'prix', 'cout', 'coute', 'combien coute', 'frais', 'paiement', 'payer', 'scolarite', 'bourse', 'echelon'],
      reply: function () {
        return {
          text: 'Les tarifs dépendent de la filière et du niveau (BTS ou Licence Professionnelle).\nPour connaître les frais exacts et les modalités de paiement, contactez le secrétariat :\n📞 ' + ECOLE.tel + '\n📧 ' + ECOLE.email,
          chips: [go('📞 Appeler', ECOLE.telHref), go('Formulaire de contact', './contact.html'), ask('Comment s’inscrire ?', 'Comment faire une inscription ?')]
        };
      }
    },
    {
      kw: ['inscription', 'inscrire', 'inscrivez', 'admission', 'candidature', 'dossier', 'postuler', 'comment entrer'],
      reply: function () {
        return {
          text: 'Pour rejoindre GEIGE :\n1. Choisissez votre filière (BTS ou Licence Professionnelle)\n2. Envoyez votre demande d’admission via le formulaire de contact ou appelez le secrétariat\n3. L’équipe GEIGE vous recontacte pour la suite de la procédure',
          chips: [go('📝 Formulaire', './contact.html'), go('📥 Brochure', ECOLE.brochure), ask('Tarifs', 'Quels sont les tarifs ?')]
        };
      }
    },
    {
      kw: ['horaire', 'horaires', 'ouvert', 'ouverture', 'ferme', 'fermeture', 'heure'],
      reply: function () {
        return {
          text: 'Nos horaires d’ouverture :\n' + ECOLE.horaires,
          chips: [go('📍 Adresse et plan', './contact.html#section'), ask('Téléphone', 'Comment vous contacter ?')]
        };
      }
    },
    {
      kw: ['adresse', 'situe', 'situer', 'localisation', 'ou etes vous', 'ou se trouve', 'venir', 'gps', 'plan', 'campus', 'lieu', 'cocody', 'abidjan'],
      reply: function () {
        return {
          text: 'GEIGE se trouve à :\n' + ECOLE.adresse + '\n\nLe plan interactif est disponible sur la page Contact.',
          chips: [go('🗺 Voir le plan', './contact.html#section'), ask('Horaires', 'Quels sont vos horaires ?')]
        };
      }
    },
    {
      kw: ['telephone', 'tel', 'numero', 'appeler', 'joindre', 'email', 'mail', 'contacter', 'contactez', 'contact', 'coordonnee', 'coordonnees', 'whatsapp', 'formulaire'],
      reply: function () {
        return {
          text: 'Voici nos coordonnées :\n📞 ' + ECOLE.tel + '\n📧 ' + ECOLE.email + '\n📍 ' + ECOLE.adresse,
          chips: [go('📞 Appeler', ECOLE.telHref), go('✉️ Écrire un mail', ECOLE.emailHref), go('Formulaire', './contact.html')]
        };
      }
    },
    {
      kw: ['brochure', 'prospectus', 'catalogue', 'telecharger', 'documentation'],
      reply: function () {
        return {
          text: 'Notre brochure (prospectus GEIGE) est téléchargeable gratuitement depuis la page Formations 📥',
          chips: [go('📥 Télécharger la brochure', ECOLE.brochure), go('Page Formations', './formations.html')]
        };
      }
    },
    {
      kw: ['etudiant', 'etudiants', 'taux', 'reussite', 'chiffre', 'combien', 'enseignant', 'effectif'],
      reply: function () {
        return {
          text: 'Quelques chiffres clés :\n🎓 100+ étudiants\n👨‍🏫 30+ enseignants\n📚 10+ filières\n✅ 90% de taux de réussite',
          chips: [ask('Nos formations', 'Quelles formations proposez-vous ?'), ask('Adresse', 'Où êtes-vous situés ?')]
        };
      }
    },
    {
      kw: ['actualite', 'actualites', 'evenement', 'nouvelle', 'news', 'agenda'],
      reply: function () {
        return {
          text: 'Toutes les nouveautés et événements de l’école sont publiés sur la page Actualités.',
          chips: [go('📰 Voir les actualités', './actualites.html'), ask('Formations', 'Quelles formations proposez-vous ?')]
        };
      }
    },
    {
      kw: ['stage', 'alternance', 'emploi', 'debouche', 'insertion professionnelle', 'travail'],
      reply: function () {
        return {
          text: 'Nos formations sont pensées pour l’emploi : programmes modernes, pratique encadrée et préparation au monde professionnel (90% de réussite).\nPour stages et partenariats, contactez le secrétariat.',
          chips: CONTACT
        };
      }
    }
  ];

  /* ---------- Moteur de réponses ---------- */
  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hit(text, motCle) {
    var k = normalize(motCle);
    if (!k) return false;
    if (k.length <= 4) return (' ' + text + ' ').indexOf(' ' + k + ' ') !== -1;
    return text.indexOf(k) !== -1;
  }

  function repondre(texteUtilisateur) {
    var texte = normalize(texteUtilisateur);
    var meilleur = null;
    var meilleurScore = 0;

    for (var i = 0; i < RULES.length; i++) {
      var score = 0;
      for (var j = 0; j < RULES[i].kw.length; j++) {
        if (hit(texte, RULES[i].kw[j])) {
          var k = normalize(RULES[i].kw[j]);
          score += k.length >= 8 ? 3 : k.length >= 5 ? 2 : 1;
        }
      }
      if (score > meilleurScore) {
        meilleurScore = score;
        meilleur = RULES[i];
      }
    }

    if (meilleur) return meilleur.reply();
    return {
      text: 'Je ne suis pas sûr d’avoir compris 🤔\nReformulez votre question ou choisissez une option :',
      chips: MENU
    };
  }

  /* ---------- Construction de l'interface ---------- */
  var panel = document.createElement('div');
  panel.className = 'assistant-panel';
  panel.id = 'geige-assistant';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Assistant GEIGE');
  panel.innerHTML =
    '<div class="assistant-head">' +
      '<div class="assistant-head-avatar"><i class="bi bi-robot"></i></div>' +
      '<div class="assistant-head-info">' +
        '<h4>Assistant GEIGE</h4>' +
        '<span class="assistant-status"><span class="assistant-dot"></span>En ligne</span>' +
      '</div>' +
      '<button type="button" class="assistant-clear" title="Effacer la conversation" aria-label="Effacer la conversation"><i class="bi bi-arrow-counterclockwise"></i></button>' +
      '<button type="button" class="assistant-close" title="Fermer" aria-label="Fermer l’assistant"><i class="bi bi-x-lg"></i></button>' +
    '</div>' +
    '<div class="assistant-msgs" aria-live="polite"></div>' +
    '<div class="assistant-chips"></div>' +
    '<form class="assistant-form">' +
      '<input type="text" placeholder="Écrivez votre message…" autocomplete="off" maxlength="300" aria-label="Votre message">' +
      '<button type="submit" aria-label="Envoyer"><i class="bi bi-send-fill"></i></button>' +
    '</form>';

  var teaser = document.createElement('div');
  teaser.className = 'assistant-teaser';
  teaser.innerHTML =
    '<p>Besoin d’aide pour choisir votre formation ?</p>' +
    '<button type="button" aria-label="Fermer la bulle"><i class="bi bi-x"></i></button>';

  document.body.appendChild(panel);
  document.body.appendChild(teaser);

  var msgs = panel.querySelector('.assistant-msgs');
  var chipsBox = panel.querySelector('.assistant-chips');
  var form = panel.querySelector('.assistant-form');
  var input = panel.querySelector('input');
  var sendBtn = panel.querySelector('button[type="submit"]');
  var closeBtn = panel.querySelector('.assistant-close');
  var clearBtn = panel.querySelector('.assistant-clear');

  /* ---------- Historique (conservé d'une page à l'autre) ---------- */
  var historique = charger();
  if (!historique.length) {
    historique.push({ r: 'b', t: bienvenue().text });
    sauver();
  }

  function charger() {
    try {
      var brut = window.localStorage.getItem(STORE_KEY);
      var data = brut ? JSON.parse(brut) : [];
      if (!Array.isArray(data)) return [];
      return data.filter(function (m) {
        return m && (m.r === 'b' || m.r === 'u') && typeof m.t === 'string';
      });
    } catch (e) {
      return [];
    }
  }

  function sauver() {
    try {
      if (historique.length > MAX_MSGS) historique = historique.slice(-MAX_MSGS);
      window.localStorage.setItem(STORE_KEY, JSON.stringify(historique));
    } catch (e) { /* stockage indisponible : on continue sans */ }
  }

  function defiler() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function bulle(role, texte) {
    var ligne = document.createElement('div');
    ligne.className = 'assistant-msg ' + (role === 'u' ? 'user' : 'bot');

    if (role !== 'u') {
      var avatar = document.createElement('div');
      avatar.className = 'assistant-avatar-sm';
      avatar.innerHTML = '<i class="bi bi-robot"></i>';
      ligne.appendChild(avatar);
    }

    var bulleTxt = document.createElement('div');
    bulleTxt.className = 'assistant-bubble';
    bulleTxt.textContent = texte;
    ligne.appendChild(bulleTxt);

    msgs.appendChild(ligne);
    defiler();
    return ligne;
  }

  function afficherChips(liste) {
    chipsBox.innerHTML = '';
    (liste || []).forEach(function (c) {
      var el = document.createElement(c.href ? 'a' : 'button');
      el.className = 'assistant-chip';
      if (c.href) {
        el.href = c.href;
      } else {
        el.type = 'button';
      }
      el.textContent = c.label;

      if (c.say) {
        el.addEventListener('click', function () { envoyer(c.say, false); });
      } else if (c.href) {
        el.addEventListener('click', fermer);
      }
      chipsBox.appendChild(el);
    });
  }

  function afficherHistorique() {
    msgs.innerHTML = '';
    historique.forEach(function (m) { bulle(m.r, m.t); });
    afficherChips(historique.length <= 1 ? bienvenue().chips : MENU);
  }

  /* ---------- Envoi / réponse ---------- */
  var enCours = false;

  function envoyer(texte, depuisSaisie) {
    texte = (texte || '').trim();
    if (!texte || enCours) return;

    cacherBulle();
    if (depuisSaisie) input.value = '';

    historique.push({ r: 'u', t: texte });
    sauver();
    bulle('u', texte);

    enCours = true;
    sendBtn.disabled = true;

    var typing = document.createElement('div');
    typing.className = 'assistant-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    defiler();

    var reponse = repondre(texte);
    var delai = 500 + Math.min(1300, reponse.text.length * 6);

    window.setTimeout(function () {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      historique.push({ r: 'b', t: reponse.text });
      sauver();
      bulle('b', reponse.text);
      afficherChips(reponse.chips);
      enCours = false;
      sendBtn.disabled = false;
    }, delai);
  }

  /* ---------- Ouverture / fermeture ---------- */
  function ouvrir() {
    panel.classList.add('open');
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    cacherBulle();
    defiler();
    if (window.innerWidth > 640) {
      window.setTimeout(function () { input.focus(); }, 280);
    }
  }

  function fermer() {
    panel.classList.remove('open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  function basculer() {
    if (panel.classList.contains('open')) fermer();
    else ouvrir();
  }

  /* ---------- Bulle d'accueil qui apparaît une fois ---------- */
  function cacherBulle() {
    teaser.classList.remove('show');
    try { window.sessionStorage.setItem(TEASER_KEY, '1'); } catch (e) { /* ignore */ }
  }

  var bulleVue = false;
  try { bulleVue = window.sessionStorage.getItem(TEASER_KEY) === '1'; } catch (e) { /* ignore */ }

  if (!bulleVue) {
    window.setTimeout(function () {
      if (!panel.classList.contains('open')) teaser.classList.add('show');
      window.setTimeout(cacherBulle, 9000);
    }, 2500);
  }

  teaser.addEventListener('click', function (e) {
    var cible = e.target;
    if (cible && cible.closest && cible.closest('button')) {
      cacherBulle();
      return;
    }
    ouvrir();
  });

  /* ---------- Événements ---------- */
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('aria-controls', panel.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Ouvrir l’assistant GEIGE');

  btn.addEventListener('click', basculer);
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      basculer();
    }
  });

  closeBtn.addEventListener('click', fermer);

  clearBtn.addEventListener('click', function () {
    historique = [{ r: 'b', t: bienvenue().text }];
    sauver();
    afficherHistorique();
    if (window.innerWidth > 640) input.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    envoyer(input.value, true);
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && panel.classList.contains('open')) fermer();
  });

  /* ---------- Affichage initial ---------- */
  afficherHistorique();
})();