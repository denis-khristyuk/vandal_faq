import React, { useState } from "react";
import "./App.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import phoneIcon from "./images/phone-solid.svg";
import telegram from "./images/telegram-brands.svg";

function App() {
  const [isFilled, setIsFilled] = useState(false);
  const [phone, setPhone] = useState("+380");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [link, setLink] = useState("");
  const requestLink =
    "https://www.corezoid.com/api/2/json/public/1175510/23ea0d5e99cb6787061d5dc5da5eed681c3d5360";

  const submitFormHandle = async (event) => {
    event.preventDefault();
    setIsError(false);

    if (phone.trim().slice(0, 4) !== "+380") {
      setErrorText("*Номер телефону повинен починатися з +380");
      setIsError(true);
      return;
    }

    if (phone.length !== 13) {
      setErrorText("*Неправильний номер телефону");
      setIsError(true);
      return;
    }

    const data = { phone, link };

    const response = await fetch(requestLink, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    console.log(response);

    setIsFilled(true);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header__logo">
          <a href="https://vandalvape.com.ua/">
            <img src={require("./images/logo.webp")} alt="" />
          </a>
        </div>
        <div className="header__links">
          <p>
            <a href="tel:+380675395485">
              <img src={phoneIcon} alt="" />
              +38(067)-539-5485
            </a>
          </p>
          <p>
            <a
              href="https://t.me/VandalVapeBot"
              rel="noreferrer"
              target="_blank"
            >
              <img src={telegram} alt="" />
              Телеграм
            </a>
          </p>
        </div>
      </header>

      <div className="main">
        <h1 className="title">Даруємо 100 грн за за розпаковку.</h1>
        <div className="bonus">
          {isFilled ? (
            <>
              <div className="divider"></div>
              <p className="message">
                Дякуємо. Ваша заявка буде оброблена протягом 24-ох годин.🐵❤️
              </p>
              <div className="divider"></div>
            </>
          ) : (
            <>
              <div className="bonus_instruction">
                <div>
                  <h2 className="bonus_instruction_title">
                    Як отримати бонус?
                  </h2>
                  <p className="bonus_instruction_item">
                    1. Придбайте товар у нас.
                  </p>
                  <p className="bonus_instruction_item">
                    2. Зніміть на відео розпаковку свого замовлення та
                    опублікуйте його у своїх соцмережах на вибір: сторіс в
                    Instagram (з активним посиланням на наш сайт:{" "}
                    <a
                      href="https://vandalvape.com.ua"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://vandalvape.com.ua
                    </a>{" "}
                    відео в TikTok (із позначкою акаунту{" "}
                    <a
                      href="https://www.tiktok.com/@vandal_unpacking?_t=8iVMnGpYEUf&_r=1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @vandal_unpacking
                    </a>
                    )
                  </p>
                  <p className="bonus_instruction_item">
                    3. Заповніть форму нижче.
                  </p>
                  <p className="warning_text">Важливо!</p>
                  <p className="bonus_instruction_item">
                    Ваш акаунт має бути відкритим на момент участі, містити
                    реальні публікації та ваші фото. Приймаються відео
                    тривалістю від 15 с, на якому видно нашу коробочку або
                    вказано, що товар куплений саме у нас. Сторіс не можна
                    видаляти завчасу - воно має самостійно зникнути через 24
                    години.
                    <br />
                    Відеоінструкція, як прикріпити посилання у сторіс:{" "}
                    <a
                      href="https://www.youtube.com/shorts/nTCAzNPJ9hU"
                      rel="noreferrer"
                      target="_blank"
                    >
                      https://www.youtube.com/shorts/nTCAzNPJ9hU
                    </a>
                  </p>
                </div>
              </div>

              <div className="form_wrap">
                <form
                  className="form_form"
                  onSubmit={(e) => submitFormHandle(e)}
                  method="post"
                  action="https://www.corezoid.com/api/2/json/public/1175510/23ea0d5e99cb6787061d5dc5da5eed681c3d5360"
                >
                  <div className="form">
                    <div className="form_input">
                      <p className="form_input_text">
                        Номер телефону, за яким було куплено товар
                      </p>
                      {isError && <p className="phoneError">{errorText}</p>}
                      <TextField
                        required
                        id="outlined-basic"
                        label="Номер телефону"
                        variant="outlined"
                        value={phone}
                        className="input_field"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setIsError(false);
                        }}
                        name="phone"
                      />
                    </div>

                    <div className="form_input">
                      <p className="form_input_text">
                        Посилання на сторіс Instagram або на відео Tik-tok
                      </p>
                      <TextField
                        required
                        id="outlined-basic"
                        label="Посилання"
                        variant="outlined"
                        className="input_field"
                        name="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="submit">
                    <Button
                      variant="contained"
                      className="form_button"
                      type="submit"
                      color="warning"
                    >
                      Відправити
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        <div className="qna">
          <p className="qna_title">Питання - відповіді:</p>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Куди мені відправлять 100 грн?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                100 грн за відгук нараховуються на ваш бонусний рахунок на
                нашому сайті.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Якщо я у вас не купував товар?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Щоб отримати бонус за відгук, потрібно бути зареєстрованим у
                нашій системі та мати мінімум 1 вдалу покупку. Тому для
                нарахування коштів зареєструйтесь самостійно на сайті або ж
                зверніться у найближчий офлайн магазин.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Який номер вказувати?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Вкажіть номер телефону, за яким ви здійснювали покупку, щоб ми
                могли ідентифікувати вас та нарахувати кошти на ваш бонусний
                рахунок.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Якщо у мене закритий профіль і я його не хочу відкривати?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Тоді ми не встигнемо переглянути сторіс протягом 24-ох годин і
                воно просто зникне. На момент публікації відкрийте профіль, а
                після нарахування бонусів зможете все повернути назад.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Якщо я опублікую сторіс і видалю через кілька годин?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Не варто хитрувати та обманювати нас - ми перевіряємо усі сторіс
                та нараховуємо кошти лише за умови правильного виконання умов.
                Тому сторіс повинно самостійно зникнути через 24 години і не
                бути видаленим самостійно.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Чому мені не нарахували бонусні 100 грн?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Уважно читайте умови та дотримуйтесь їх - якщо форма неправильно
                заповнена, немає посилання на сторіс в Instagram, ви не
                опублікували його або видалили швидше, ніж за 24 години, у вас
                фейковий акаунт або ж він закритий, Tik-tok видалив ваше відео -
                все це може бути причиною того, що ваш запит буде скасований.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Як прикріпити посилання на сайт?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Натискаєте &quot;додати сторіс&quot;, після проводите пальцем
                вгору або шукаєте значок зі смайликом у правому верхньому куті -
                тоді з&apos;явиться поле &quot;посилання&quot;, натискаючи на
                яке потрібно вставити посилання на наш сайт -{" "}
                <a
                  href="https://vandalvape.com.ua"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://vandalvape.com.ua
                </a>
                . Натискаєте &quot;готово&quot; та публікуєте сторіс.
                Відеоінструкція:{" "}
                <a
                  href="https://www.youtube.com/shorts/nTCAzNPJ9hU"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://www.youtube.com/shorts/nTCAzNPJ9hU
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Що саме я маю опублікувати?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Опублікуйте відгук про покупку у Vandal Vape - можете зробити
                фото/відео придбаного товару, описати свої враження чи
                побажання, або ж змонтувати креативний ролик - тут ми не
                обмежуємо вас, тож можете проявити фантазію. Обов&apos;язковою
                умовою для відгуку в Instagram є наявність клікабельного
                посилання на наш сайт (
                <a
                  href="https://vandalvape.com.ua"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://vandalvape.com.ua
                </a>
                ), відкритий реальний профіль та те, що сторіс має бути активним
                24 години (видаляти завчасу не можна). Обов’язкова умова для
                відео в Tik-tok: ваше відео має пробути у вас на сторінці
                мінімум три дні і не має бути видалене платформою Tik-tok. Ось
                декілька порад, яких потрібно дотриматись, щоб відео не
                видалили: не парити в кадрі, не ставити хештеги "вейп, под,
                одноразка і т.д. (англійською мовою також)" і не писати ці слова
                в кадрі, на відео не має бути жодних qr-кодів, акцент на тому,
                що це просто РОЗПАКОВКА і всі хештеги і підписи тільки про це
                (це найчастіші причини видалення відео). Також під відео
                необхідно відмітити наш акаунт в Tik-tok{" "}
                <a
                  href="https://www.tiktok.com/@vandal_unpacking?_t=8iVMnGpYEUf&_r=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  @vandal_unpacking
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Скільки разів я можу скористатись цією пропозицією?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Один зареєстрований покупець може лише раз отримати 100 грн за
                відгук.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Коли будуть нараховані бонусні гривні?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Кошти нарахуються на ваш бонусний рахунок протягом 24-ох годин
                після публікації сторіс або відео в Tik-tok.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Як я можу їх списати?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                При покупці на сайті ви можете переглянути, скільки у вас
                бонусних гривень і використати потрібну кількість. Або ж
                зазначте менеджеру чи продавцю в офлайн магазині, скільки
                бажаєте списати і вони все зроблять замість вас.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Коли згорають бонусні гривні?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Вони не згорять - скористатись ними ви зможете без жодних
                часових обмежень.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default App;
