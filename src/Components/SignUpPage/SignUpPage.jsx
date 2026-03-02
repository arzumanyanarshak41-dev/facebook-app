import  { useReducer } from "react";
import { MetaIcon } from "./SVG/MetaIcon";
import { ArrowLeft } from "./SVG/ArrowLeft";
import style from "./SignUpPage.module.css";
import { XIcon } from "./SVG/XIcon";
import { QuestionIcon } from "./SVG/QuestionIcon";
import { EyeOn } from "./SVG/EyeOn";
import { EyeOff } from "./SVG/EyeOff";
import { ImportantIcon } from "./SVG/ImportantIcon";
export const SignUpPage = () => {
  const initialState = {
    dateDayStyl: { style: style.normStateDay, value: "" },
    dateMonthStyl: { style: style.normStateDay, value: "" },
    dateYearStyl: { style: style.normStateDay },
    genderStyl: { style: style.normStateDay },
    questionDisplay: {
      date: "none",
      gender: "none",
    },
    firstName: {
      active: false,
      divClass: style.box,
      inputValue: "",
      delIcon: false,
    },
    lastName: {
      active: false,
      divClass: style.box,
      inputValue: "",
      delIcon: false,
    },
    telephoneNumber: {
      divClass: style.telInpHolderNormSate,
      inputValue: "",
      delIcon: false,
    },
    password: {
      active: false,
      divClass: style.telInpHolderNormSate,
      inputValue: "",
      delIcon: false,
      inpType: "password",
    },
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "onChange":
        return {
          ...state,
          [action.sort.onType]: {
            ...state[action.sort.onType],
            divClass:
              action.sort.onType === "telephoneNumber" ||
                action.sort.onType === "password"
                ? style.telInpOnFocusChange
                : style.box2,
            active: true,
            inputValue: action.sort.payload,
            delIcon: action.sort.payload ? true : false,
          },
        };

      case "onFocus":
        return {
          ...state,
          [action.sort.onType]: {
            ...state[action.sort.onType],
            active: true,
            divClass:
              action.sort.onType === "telephoneNumber" ||
                action.sort.onType === "password"
                ? style.telInpOnFocusChange
                : style.box2,
            delIcon: state[action.sort.onType].inputValue ? true : false,
          },
        };

      case "onBlur": {
        if (action.sort.payload === "") {
          return {
            ...state,
            [action.sort.onType]: {
              ...state[action.sort.onType],
              divClass:
                action.sort.onType === "telephoneNumber" ||
                  action.sort.onType === "password"
                  ? style.telInpOnBlurRed
                  : style.red,
              active: false,
              delIcon: false,
            },
          };
        } else {
          return {
            ...state,
            [action.sort.onType]: {
              ...state[action.sort.onType],
              active: true,
              divClass:
                action.sort.onType === "telephoneNumber" ||
                  action.sort.onType === "password"
                  ? style.telInpOnBlur
                  : style.box,
              delIcon: false,
            },
          };
        }
      }
      case "delinput": {
        return {
          ...state,
          [action.sort.onType]: {
            ...state[action.sort.onType],
            inputValue: "",
            delIcon: false,
          },
        };
      }
      case "onChangeSelect": {

        return {
          ...state,

          [action.sort.onType]: {
            style: style.onNormYesDay,
            value: action.sort.payload,
          },
        };
      }
      case "onBlurSelect": {
        if (action.sort.payload !== "") {
          if (
            action.sort.onType === "dateDayStyl" &&
            action.sort.payload === "31" &&
            ["4", "6", "9", "11"].includes(state.dateMonthStyl.value)
          ) {
            return {
              ...state,
              [action.sort.onType]: {
                style: style.normStateYesDay,
                value: "30",
              },
            };
          } else if (
            action.sort.onType === "dateMonthStyl" &&
            ["4", "6", "9", "11"].includes(action.sort.payload) &&
            state.dateDayStyl.value === "31"
          ) {
            return {
              ...state,
              [action.sort.onType]: {
                style: style.normStateYesDay,
                value: [action.sort.payload],
              },
              dateDayStyl: {
                style: style.normStateYesDay,
                value: "30",
              },
            };
          } else if (
            action.sort.onType === "dateDayStyl" &&
            (action.sort.payload === "31" || action.sort.payload === "30") &&
            state.dateMonthStyl.value === "2"
            //
          ) {
            return {
              ...state,
              [action.sort.onType]: {
                style: style.normStateYesDay,
                value: "29",
              },
            };
          } else if (
            action.sort.onType === "dateMonthStyl" &&
            action.sort.payload === "2" &&
            (state.dateDayStyl.value === "31" ||
              state.dateDayStyl.value === "30")
          ) {
            return {
              ...state,
              [action.sort.onType]: {
                style: style.normStateYesDay,
                value: [action.sort.payload],
              },
              dateDayStyl: {
                style: style.normStateYesDay,
                value: "29",
              },
            };
          } else {
            return {
              ...state,
              [action.sort.onType]: {
                style: style.normStateYesDay,
                value: action.sort.payload,
              },
            };
          }
        } else {
          return {
            ...state,
            [action.sort.onType]: {
              style: style.normStateDay,
              value: action.sort.payload,
            },
          };
        }
      }
      case "onFocusSelect": {
        if (action.sort.payload === "") {
          return {
            ...state,
            [action.sort.onType]: {
              style: style.onFocusYesDay,
              value: action.sort.payload,
            },
          };
        } else {
          return {
            ...state,
            [action.sort.onType]: {
              style: style.onNormYesDay,
              value: action.sort.payload,
            },
          };
        }
      }
      case "textToPsw":
        return {
          ...state,
          password: {
            ...state.password,
            inpType: "text",
          },
        };
      case "pswToText":
        return {
          ...state,
          password: {
            ...state.password,
            inpType: "password",
          },
        };
      case "questionTextFocus":
        return {
          ...state,
          questionDisplay: {
            ...state.questionDisplay,
            [action.sort]: "block",
          },
        };
      case "questionTextBlur":
        return {
          ...state,
          questionDisplay: {
            ...state.questionDisplay,
            [action.sort]: "none",
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form className={style.container}>
      <span className={style.arrowIconHolder}>
        <ArrowLeft />
      </span>
      <span className={style.metaIconHolder}>
        <MetaIcon /> <p>Meta</p>
      </span>
      <h2 className={style.infoTitle}>Get started on Facebook</h2>
      <p className={style.infoText}>
        Create an account to connect with friends, family and communities of
        people who share your interests.{" "}
      </p>
      <label className={style.infoLabelStart}>Name</label>
      <section
        onBlur={() => dispatch({ type: "blurName" })}
        className={style.nameHolder}
      >
        <div
          style={{ display: "flex", alignItems: "start" }}
          className={state.firstName.divClass}
        >
          <p
            className={`${style.text} ${state.firstName.active && style.active}`}
          >
            First name
          </p>
          <input
            className={style.signInp}
            onBlur={(e) =>
              dispatch({
                type: "onBlur",
                sort: { onType: "firstName", payload: e.target.value },
              })
            }
            onFocus={() =>
              dispatch({ type: "onFocus", sort: { onType: "firstName" } })
            }
            onChange={(e) =>
              dispatch({
                type: "onChange",
                sort: { onType: "firstName", payload: e.target.value },
              })
            }
            value={state.firstName.inputValue}
            type="text"
          />
          {state.firstName.delIcon && (
            <i
              className={style.XIconHoler}
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch({ type: "delinput", sort: { onType: "firstName" } });
              }}
            >
              <XIcon />
            </i>
          )}
        </div>

        <div
          style={{ display: "flex", alignItems: "start" }}
          className={state.lastName.divClass}
        >
          <p
            className={`${style.text} ${state.lastName.active && style.active}`}
          >
            Last name
          </p>
          <input
            className={style.signInp}
            onBlur={(e) =>
              dispatch({
                type: "onBlur",
                sort: { onType: "lastName", payload: e.target.value },
              })
            }
            onFocus={() =>
              dispatch({ type: "onFocus", sort: { onType: "lastName" } })
            }
            onChange={(e) =>
              dispatch({
                type: "onChange",
                sort: { onType: "lastName", payload: e.target.value },
              })
            }
            value={state.lastName.inputValue}
            type="text"
          />
          {state.lastName.delIcon && (
            <i
              className={style.XIconHoler}
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch({ type: "delinput", sort: { onType: "lastName" } });
              }}
            >
              <XIcon />
            </i>
          )}
        </div>

        {/* <p className={style.underText}>Как вас зовут?</p> */}
      </section>
      <div className={style.underTextNameHolder}>
        <span className={style.underTextHolder}>
          <i> <ImportantIcon /></i>

          <p className={style.underText}>What's your first name?</p>
        </span>
        <span className={style.underTextHolder}>
          <i> <ImportantIcon /></i>
          <p className={style.underText}>What's your last name?</p>
        </span>
      </div>
      <span className={style.labelHolder}>
        <h3 className={style.infoLabel}>Birthday</h3>
        <button
          type="button"
          onBlur={(e) => {
            dispatch({ type: "questionTextBlur", sort: "date" });
          }}
          onFocus={(e) => {
            dispatch({ type: "questionTextFocus", sort: "date" });
          }}
          className={style.infoBtn}
        >
          <QuestionIcon />
        </button>
        <span className={style.posInfo}>
          <span
            style={{ display: state.questionDisplay.date }}
            className={style.infoText}
          >
            Providing your birthday helps make sure you get the right Facebook
            experience for your age. If you want to change who sees this, go to
            the About section of your profile. For more details, please visit
            our
            <h6 className={style.specInfo}> Privacy Policy.</h6>
          </span>
        </span>
      </span>

      <div className={style["date-select-holder"]}>
        <section
          onBlur={(e) =>
            dispatch({
              type: "onBlurSelect",
              sort: { onType: "dateDayStyl", payload: e.target.value },
            })
          }
          onFocus={(e) =>
            dispatch({
              type: "onFocusSelect",
              sort: { onType: "dateDayStyl", payload: e.target.value },
            })
          }
          className={state.dateDayStyl.style}
        >
          <p className={`${style.day} `}>Day</p>
          {/* ${state.dateDayStyl} */}
          <select
            value={state.dateDayStyl.value}
            onChange={(e) =>
              dispatch({
                type: "onChangeSelect",
                sort: { onType: "dateDayStyl", payload: e.target.value },
              })
            }
            className={style.selDefText}
          >
            <option value="" hidden className={style.selOpt}></option>
            {[...Array(31)].map((el, index) => {
              return (
                <option key={index} value={index + 1} className={style.selOpt}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </section>
        <section
          onBlur={(e) =>
            dispatch({
              type: "onBlurSelect",
              sort: { onType: "dateMonthStyl", payload: e.target.value },
            })
          }
          onFocus={(e) =>
            dispatch({
              type: "onFocusSelect",
              sort: { onType: "dateMonthStyl", payload: e.target.value },
            })
          }
          className={state.dateMonthStyl.style}
        >
          <p className={`${style.day} `}>Month</p>
          <select
            onChange={(e) =>
              dispatch({
                type: "onChangeSelect",
                sort: { onType: "dateMonthStyl", payload: e.target.value },
              })
            }
            className={style.selDefText}
          >
            <option value="" hidden className={style.selDatDay}></option>
            <option className={style.selOpt} value="1">
              January
            </option>
            <option className={style.selOpt} value="2">
              February
            </option>
            <option className={style.selOpt} value="3">
              March
            </option>
            <option className={style.selOpt} value="4">
              April
            </option>
            <option className={style.selOpt} value="5">
              May
            </option>
            <option className={style.selOpt} value="6">
              June
            </option>
            <option className={style.selOpt} value="7">
              July
            </option>
            <option className={style.selOpt} value="8">
              August
            </option>
            <option className={style.selOpt} value="9">
              September
            </option>
            <option className={style.selOpt} value="10">
              October
            </option>
            <option className={style.selOpt} value="11">
              November
            </option>
            <option className={style.selOpt} value="12">
              December
            </option>
          </select>
        </section>
        <section
          onBlur={(e) =>
            dispatch({
              type: "onBlurSelect",
              sort: { onType: "dateYearStyl", payload: e.target.value },
            })
          }
          onFocus={(e) =>
            dispatch({
              type: "onFocusSelect",
              sort: { onType: "dateYearStyl", payload: e.target.value },
            })
          }
          className={state.dateYearStyl.style}
        >
          <p className={`${style.day} `}>Year</p>
          <select
            onChange={(e) =>
              dispatch({
                type: "onChangeSelect",
                sort: { onType: "dateYearStyl", payload: e.target.value },
              })
            }
            className={style.selDefText}
          >
            <option value="" hidden></option>
            {[...Array(151)].map((el, i) => {
              return (
                <option className={style.selOpt} key={i} value={2026 - i}>
                  {2026 - i}
                </option>
              );
            })}
          </select>
        </section>
      </div>
      <span className={style.underTextHolder}>

        <p className={style.underText}>
          Select your birthday. You can change who can see this later.
        </p></span>
      <span className={style.labelHolder}>
        <h3 className={style.infoLabel}>Gender</h3>
        <button
          type="button"
          onBlur={(e) => {
            dispatch({ type: "questionTextBlur", sort: "gender" });
          }}
          onFocus={(e) => {
            dispatch({ type: "questionTextFocus", sort: "gender" });
          }}
          className={style.infoBtn}
        >
          <QuestionIcon />
        </button>
        <span className={style.posInfo}>
          <p
            style={{ display: state.questionDisplay.gender }}
            className={style.infoText}
          >
            You can change who sees your gender on your profile later. Select
            Custom to choose another gender, or if you'd rather not say.
          </p>
        </span>
      </span>

      <section
        onBlur={(e) =>
          dispatch({
            type: "onBlurSelect",
            sort: { onType: "genderStyl", payload: e.target.value },
          })
        }
        onFocus={(e) =>
          dispatch({
            type: "onFocusSelect",
            sort: { onType: "genderStyl", payload: e.target.value },
          })
        }
        className={`${style.genderSection} ${state.genderStyl.style}`}
      >
        <p className={`${style.gendSelDef} `}>Select your gender</p>
        <select
          onChange={() =>
            dispatch({
              type: "onChangeSelect",
              sort: { onType: "genderStyl" },
            })
          }
          className={style.selDefText}
        >
          <option value="" hidden>
            {" "}
          </option>
          <option className={style.selOpt} value="Мужской">
            Female
          </option>
          <option className={style.selOpt} value="Женский">
            Male
          </option>
          <option className={style.selOpt} value="Другой">
            Custom
          </option>
        </select>
      </section>
      <div className={style.underTextHolder}>
        <i><ImportantIcon /></i>
        <p className={style.underText}>
          Please choose a gender. You can change who can see this later.
        </p>
      </div>
      <label className={style.infoLabelStart}>Mobile number or email</label>
      <div className={state.telephoneNumber.divClass}>
        <p className={`${style.telPlaceholder} `}>Mobile number or email</p>
        <input
          className={style.telInp}
          onBlur={(e) =>
            dispatch({
              type: "onBlur",
              sort: { onType: "telephoneNumber", payload: e.target.value },
            })
          }
          onFocus={() =>
            dispatch({ type: "onFocus", sort: { onType: "telephoneNumber" } })
          }
          onChange={(e) =>
            dispatch({
              type: "onChange",
              sort: { onType: "telephoneNumber", payload: e.target.value },
            })
          }
          value={state.telephoneNumber.inputValue}
          type="text"
        />
        {state.telephoneNumber.delIcon && (
          <i
            className={style.XIconHoler}
            onMouseDown={(e) => {
              e.preventDefault();
              dispatch({
                type: "delinput",
                sort: { onType: "telephoneNumber" },
              });
            }}
          >
            <XIcon />
          </i>
        )}
      </div>
      <span className={style.underTextHolder}>
        <i><ImportantIcon /></i>
        <p className={style.underText}>
          Please enter a valid mobile number or email address.
        </p>
      </span>
      <span className={style.infoText}>
        You may receive notifications from us.
        <h6 className={style.specInfo}>
          {" "}
          Learn why we askk for your contact information.
        </h6>
      </span>
      <label className={style.infoLabelStart}> Password</label>
      <div className={state.password.divClass}>
        <p className={`${style.telPlaceholder} `}>Password</p>
        <input
          className={style.telInp}
          onBlur={(e) =>
            dispatch({
              type: "onBlur",
              sort: { onType: "password", payload: e.target.value },
            })
          }
          onFocus={() =>
            dispatch({ type: "onFocus", sort: { onType: "password" } })
          }
          onChange={(e) =>
            dispatch({
              type: "onChange",
              sort: { onType: "password", payload: e.target.value },
            })
          }
          value={state.password.inputValue}
          type={state.password.inpType}
        />
        {state.password.delIcon === true ? (
          state.password.inpType === "text" ? (
            <i
              className={style.XIconHoler}
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch({
                  type: "pswToText",
                  sort: { onType: "password" },
                });
              }}
            >
              <EyeOn />
            </i>
          ) : (
            <i
              className={style.XIconHoler}
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch({
                  type: "textToPsw",
                  sort: { onType: "password" },
                });
              }}
            >
              <EyeOff />
            </i>
          )
        ) : null}
      </div>
      <span className={style.underTextHolder}>
        <i><ImportantIcon /></i>
        <p className={style.underText}>
          Enter a combination of at least six numbers, letters and punctuation
          marks (like ! and &).
        </p>
      </span>
      <div className={style.infoText}>
        <p className={style.infoHolder}>
          People who use our service may have uploaded your contact information
          to Facebook. <span className={style.specInfo}>Learn more</span>.
        </p>
        <p className={style.infoHolder}>
          By tapping Submit, you agree to create an account and to Facebook's
          <span className={style.specInfo}>Terms,Privacy Policy</span> and
          <span className={style.specInfo}> Cookies Policy</span>{" "}
        </p>
        <p className={style.infoHolder}>
          The
          <span className={style.specInfo}>Privacy Policy</span> describes the ways
          we can use the information we collect when you create an account. For
          example, we use this information to provide, personalize and improve
          our products, including ads.
        </p>
      </div>
      <button className={style.subButton}>Submit</button>
      <button className={style.beforeButton}>I already have an account</button>
    </form>
  );
};
