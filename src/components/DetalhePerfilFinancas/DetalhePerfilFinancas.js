import styles from './DetalhePerfilFinancas.module.css'
import { getDatabase, ref, get, set, child } from "firebase/database";
import context from '../GlobalVariables';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function DetalhePerfilFinancas() {
    const dbRef = ref(getDatabase());
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [perfil, setPerfil] = useState({});

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // useEffect(() => { console.log(perfil?.livrosQueroTer); }, [perfil])
    useEffect(() => {
        if (usuario?.user?.uid) {
            setUid(usuario['user']['uid']);
        }
    }, [usuario])

    useEffect(() => {
        if ((uid !== '') && (uid.lenght !== 0)) {
            get(child(dbRef, `usuarios/${uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    // console.log('uid ->' + uid);
                    setPerfil(snapshot.val());
                    writeUserDataPrioridade()
                } else {
                    console.log("No data available");
                }
            })
        }
    }, [uid])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //////////////////////////////////////
    // ADICIONANDO UM A PRIORIDADE
    function writeUserDataPrioridade() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/perfil/`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            console.log(result);
            // console.log(result);
            // result = { ...result, [params.id]: [resposta['items'][0]['volumeInfo']['title']] };
            // console.log(result);
            // set(ref(db, `usuarios/${usuario.user.uid}/livrosFavoritos`), result);
        })
    }

    function calcularPrevisao() {
        const db = getDatabase();
        let result = {};
        let soma5Prio, soma4Prio, soma3Prio, soma2Prio;
        let somaPrio2345, somaPrio345, somaPrio45, somaPrio23, somaPrio34, somaPrio234;
        soma5Prio = perfil.perfil.precoPrio1 + perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4 + perfil.perfil.precoPrio5;
        soma4Prio = perfil.perfil.precoPrio1 + perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4;
        soma3Prio = perfil.perfil.precoPrio1 + perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3;
        soma2Prio = perfil.perfil.precoPrio1 + perfil.perfil.precoPrio2;
        somaPrio2345 = perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4 + perfil.perfil.precoPrio5;
        somaPrio345 = perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4 + perfil.perfil.precoPrio5;
        somaPrio234 = perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4;
        somaPrio45 = perfil.perfil.precoPrio4 + perfil.perfil.precoPrio5;
        somaPrio23 = perfil.perfil.precoPrio2 + perfil.perfil.precoPrio3;
        somaPrio34 = perfil.perfil.precoPrio3 + perfil.perfil.precoPrio4;

        get(child(dbRef, `usuarios/${usuario.user.uid}/perfil/`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            console.log(result);

            if (perfil.perfil.oQueFazerSaldoMensal == 'Descartado') {
                if (perfil.perfil.precoPrio1 > perfil.perfil.saldoMensal || perfil.perfil.precoPrio2 > perfil.perfil.saldoMensal || perfil.perfil.precoPrio3 > perfil.perfil.saldoMensal || perfil.perfil.precoPrio4 > perfil.perfil.saldoMensal || perfil.perfil.precoPrio5 > perfil.perfil.saldoMensal) {
                    //O preco de uma de suas prioridades é maior que seu saldo mensal e você optou por não acumular o saldo. Para que a previsão seja feita, aumento seu saldo mensal ou acumule seu saldo.
                }
                else {
                    if (soma5Prio <= perfil.perfil.saldoMensal) {
                        //Você consegue comprar todos os livros de sua prioridade em 1 mês!
                    }
                    else if (soma4Prio <= perfil.perfil.saldoMensal) {
                        //Você consegue comprar suas 4 primeiras prioridades no primeiro mês e a a prioridade 5 no segundo mês
                    }
                    else if (soma3Prio <= perfil.perfil.saldoMensal) {
                        if (somaPrio45 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar suas 3 primeiras prioridades no primeiro mês e as prioridades 4 e 5 no segundo mês
                        }
                        else {
                            //Você consegue comprar suas 3 primeiras prioridades no primeiro mês, a 4 prioridade no segundo mês e a 5 prioridade no terceiro mês.
                        }
                    }
                    else if (soma2Prio <= perfil.perfil.saldoMensal) {
                        if (somaPrio345 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar suas 2 primeiras prioridades no primeiro mês e as prioridades 3, 4 e 5 no segundo mês
                        }
                        else if (somaPrio34 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar suas 2 primeiras prioridades no primeiro mês, as prioridade 3 e 4 no segundo mês e a 5 prioridade no terceiro mês.
                        }
                        else if (somaPrio45 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar suas 2 primeiras prioridades no primeiro mês, a prioridade 3 no segundo mês e as prioridade 4 e 5 no terceiro mês.
                        }
                        else {
                            //Você consegue comprar suas 2 primeiras prioridades no primeiro mês, a prioridade 3 no segundo mês, a prioridade 4 no terceiro mês e a prioridade 5 no quarto mês.
                        }
                    }
                    else {
                        if (somaPrio2345 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, e as demais prioridades no segundo mês
                        }
                        else if (somaPrio345 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, a prioridade 2 no segundo mês e as prioridades 3, 4 e 5 no terceiro mês
                        }
                        else if (somaPrio23 <= perfil.perfil.saldoMensal && somaPrio45 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, as prioridade 2 e 3 no segundo mês e as prioridades 4 e 5 no terceiro mês
                        }
                        else if (somaPrio23 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, as prioridade 2 e 3 no segundo mês, a prioridades 4 no terceiro mês e a prioridade 5 no quarto mês
                        }
                        else if (somaPrio34 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, a prioridade 2 no segundo mês, as prioridades 3 e 4 no terceiro mês e a prioridade 5 no quarto mês
                        }
                        else if (somaPrio45 <= perfil.perfil.saldoMensal) {
                            //Você consegue comprar a prioridade 1 no primeiro mês, a prioridade 2 no segundo mês, a prioridades 3 no terceiro mês e as prioridades 4 e 5 no quarto mês
                        }
                        else {
                            //Você consegue comprar a prioridade 1 no primeiro mês, a prioridade 2 no segundo mês, a prioridade 3 no terceiro mês, a prioridade 4 no quarto mês e a prioridade 5 no quinto mês
                            //Você consegue comprar um livro por mês na ordem de prioridade.
                        }
                    }
                }
            }
            else {
                // Acumulado
                let result, acumulo;
                if (soma5Prio < perfil.perfil.saldoMensal) {
                    //Você consegue comprar todos os livros de sua prioridade em 1 mês!
                    result = perfil.perfil.saldoMensal - soma5Prio;
                    //Depois da compra sobrará result
                }
                else if (soma4Prio < perfil.perfil.saldoMensal) {
                    //Você consegue comprar suas 4 primeiras prioridades no primeiro mês
                    result = perfil.perfil.saldoMensal - soma4Prio;
                    acumulo = perfil.perfil.saldoMensal + result;
                    if (perfil.perfil.precoPrio5 < acumulo) {
                        //e a prioridade 5 no segundo mês
                    }
                    else {
                        acumulo = acumulo + (perfil.perfil.saldoMensal * 2);
                        if (perfil.perfil.precoPrio5 > acumulo) {
                            //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                            //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                            //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                        }
                        else {
                            //No segundo mês você não deve comprar nenhum livro para economizar para a prioridade 5, e no terceiro mês você poderá compra-la.
                        }
                    }
                }
                else if (soma3Prio < perfil.perfil.saldoMensal) {
                    //Você consegue comprar suas 3 primeiras prioridades no primeiro mês
                    result = perfil.perfil.saldoMensal - soma3Prio;
                    acumulo = perfil.perfil.saldoMensal + result;
                    if (somaPrio45 < acumulo) {
                        //E a prioridade 4 e 5 no segundo mês
                    }
                    else if (perfil.perfil.precoPrio4 > acumulo) {
                        acumulo = acumulo + (perfil.perfil.saldoMensal * 2);
                        if (perfil.perfil.precoPrio4 > acumulo) {
                            //A prioridade 4 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                            //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                            //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                            //PS: Não é possivel calcular quanto tempo precisará para comprar a prioridade 5
                        }
                        else {
                            //No segundo mês você não deve comprar nenhum livro para economizar para a prioridade 4, comprando-a no terceiro mes
                            result = acumulo - perfil.perfil.precoPrio4;
                            acumulo = result + perfil.perfil.saldoMensal;
                            if (perfil.perfil.precoPrio5 > acumulo) {
                                acumulo = acumulo + perfil.perfil.saldoMensal;
                                if (perfil.perfil.precoPrio5 > acumulo) {
                                    //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                    //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                    //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                }
                                else {
                                    // e a prioridade 5 no quarto mês
                                }
                            }
                        }
                    }
                    else {
                        // A prioridade 4 no segundo mês
                        result = acumulo - perfil.perfil.precoPrio4;
                        acumulo = result + perfil.perfil.saldoMensal;
                        if (perfil.perfil.precoPrio5 > acumulo) {
                            acumulo = acumulo + perfil.perfil.saldoMensal;
                            if (perfil.perfil.precoPrio5 > acumulo) {
                                //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                            }
                            else {
                                // e a prioridade 5 no terceiro mês
                            }
                        }
                    }
                }
                else if (soma2Prio < perfil.perfil.saldoMensal) {
                    //Você consegue comprar as prioridade 1 e 2 no primeiro mês
                    result = perfil.perfil.saldoMensal - soma2Prio;
                    acumulo = perfil.perfil.saldoMensal + result;
                    if (somaPrio345 < acumulo) {
                        //E as prioridades 3, 4 e 5 no segundo mês
                        result = acumulo - somaPrio345;
                        acumulo = perfil.perfil.saldoMensal + result;
                    }
                    else if (somaPrio34 < acumulo) {
                        //E as prioridades 3 e 4 no segundo mês
                        result = acumulo - somaPrio34;
                        acumulo = perfil.perfil.saldoMensal + result;
                        if (perfil.perfil.precoPrio5 > acumulo) {
                            acumulo = acumulo + perfil.perfil.saldoMensal;
                            if (perfil.perfil.precoPrio5 > acumulo) {
                                //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                            }
                            else {
                                // e a prioridade 5 no terceiro mês
                            }
                        }
                    }
                    else if (perfil.perfil.precoPrio3 < acumulo) {
                        // A prioridade 3 no segundo mês
                        result = acumulo - perfil.perfil.precoPrio3;
                        acumulo = perfil.perfil.saldoMensal + result;
                        if (somaPrio45 < acumulo) {
                            //E as prioridades 4 e 5 no terceiro mês
                            result = acumulo - somaPrio45;
                            acumulo = perfil.perfil.saldoMensal + result;
                        }
                        else if (perfil.perfil.precoPrio4 < acumulo) {
                            //A prioridade 4 no terceiro mês
                            result = acumulo - perfil.perfil.precoPrio4;
                            acumulo = perfil.perfil.saldoMensal + result;
                            if (perfil.perfil.precoPrio5 > acumulo) {
                                acumulo = acumulo + perfil.perfil.saldoMensal;
                                if (perfil.perfil.precoPrio5 > acumulo) {
                                    //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                    //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                    //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                }
                                else {
                                    // e a prioridade 5 no quarto mês
                                }
                            }
                        }
                    }
                }
                else {
                    if (perfil.perfil.precoPrio1 < perfil.perfil.saldoMensal) {
                        //Você consegue comprar a prioridade 1 no primeiro mês
                        result = perfil.perfil.saldoMensal - perfil.perfil.precoPrio1;
                        acumulo = perfil.perfil.saldoMensal + result;
                        if (somaPrio2345 < acumulo) {
                            //E as prioridades 2, 3, 4 e 5 no segundo mês
                        }
                        else if (somaPrio234 < acumulo) {
                            // E as prioridades 2, 3 e 4 no segundo mês
                            result = acumulo - somaPrio234;
                            acumulo = perfil.perfil.saldoMensal + result;
                            if (perfil.perfil.precoPrio5 > acumulo) {
                                acumulo = acumulo + perfil.perfil.saldoMensal;
                                if (perfil.perfil.precoPrio5 > acumulo) {
                                    //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                    //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                    //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                }
                                else {
                                    // e a prioridade 5 no quarto mês
                                }
                            }
                            else {
                                // e a prioridade 5 no terceiro mês
                            }
                        }
                    }
                    else {
                        acumulo = perfil.perfil.saldoMensal * 2;
                        if (perfil.perfil.precoPrio1 > acumulo) {
                            //A prioridade 1 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                            //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                            //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                        }
                        else {
                            //Você não deve fazer comprar no primeiro mês para economiza para comprar a prioridade 1 no segundo mês
                            result = acumulo - perfil.perfil.precoPrio1;
                            acumulo = perfil.perfil.saldoMensal + result;
                            if (somaPrio2345 < acumulo) {
                                // E as demais prioridades no terceiro mês
                            }
                            else if (somaPrio234 < acumulo) {
                                //E as prioridades 2, 3 e 4 no terceiro mês
                                result = acumulo - somaPrio234;
                                acumulo = perfil.perfil.saldoMensal + result;
                                if (perfil.perfil.precoPrio5 > acumulo) {
                                    acumulo = acumulo + perfil.perfil.saldoMensal;
                                    if (perfil.perfil.precoPrio5 > acumulo) {
                                        //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                        //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                        //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                    }
                                    else {
                                        // e a prioridade 5 no quinto mês
                                    }
                                }
                                else {
                                    // e a prioridade 5 no quarto mês
                                }
                            }
                            else if (somaPrio23 < acumulo) {
                                //E as prioridades 2 e 3 no terceiro mês
                                result = acumulo - somaPrio23;
                                acumulo = perfil.perfil.saldoMensal + result;
                                if (somaPrio45 < acumulo) {
                                    //E as prioridade 4 e 5 no quarto mês
                                    result = acumulo - somaPrio45;
                                    acumulo = perfil.perfil.saldoMensal + result;
                                }
                                else if (perfil.perfil.precoPrio4 < acumulo) {
                                    //E a prioridade 4 no quarto mês
                                    result = acumulo - perfil.perfil.precoPrio4;
                                    acumulo = perfil.perfil.saldoMensal + result;
                                    if (perfil.perfil.precoPrio5 > acumulo) {
                                        acumulo = acumulo + perfil.perfil.saldoMensal;
                                        if (perfil.perfil.precoPrio5 > acumulo) {
                                            //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                            //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                            //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                        }
                                        else {
                                            // e a prioridade 5 no sexto mês
                                        }
                                    }
                                    else {
                                        // e a prioridade 5 no quinto mês
                                    }
                                }
                                else {
                                    acumulo = acumulo + perfil.perfil.saldoMensal;
                                    if (perfil.perfil.precoPrio4 > acumulo) {
                                        //A prioridade 4 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                        //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                        //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                    }
                                    else {
                                        //E a prioridade 4 no quarto mês
                                        result = acumulo - perfil.perfil.precoPrio4;
                                        acumulo = perfil.perfil.saldoMensal + result;
                                        if (perfil.perfil.precoPrio5 > acumulo) {
                                            acumulo = acumulo + perfil.perfil.saldoMensal;
                                            if (perfil.perfil.precoPrio5 > acumulo) {
                                                //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                                //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                                //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                            }
                                            else {
                                                // e a prioridade 5 no sexto mês
                                            }
                                        }
                                        else {
                                            // e a prioridade 5 no quinto mês
                                        }
                                    }
                                }
                            }
                            else if (perfil.perfil.precoPrio2 < acumulo) {
                                //E a prioridade 2 no terceiro mês
                                result = acumulo - perfil.perfil.precoPrio2;
                                if (somaPrio345 < acumulo) {
                                    // e as prioridades 3, 4 e 5 no quarto mês
                                }
                                else if (somaPrio34 < acumulo) {
                                    // e as prioridade 3 e 4 no quarto mês
                                    result = acumulo - perfil.perfil.somaPrio34;
                                    acumulo = perfil.perfil.saldoMensal + result;
                                    if (perfil.perfil.precoPrio5 > acumulo) {
                                        acumulo = acumulo + perfil.perfil.saldoMensal;
                                        if (perfil.perfil.precoPrio5 > acumulo) {
                                            //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                            //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                            //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                        }
                                        else {
                                            // e a prioridade 5 no sexto mês
                                        }
                                    }
                                    else {
                                        // e a prioridade 5 no quinto mês
                                    }
                                }
                                else if (perfil.perfil.precoPrio3 < acumulo) {
                                    // e a prioridade 3 no quarto mês
                                    result = acumulo - perfil.perfil.precoPrio3;
                                    acumulo = perfil.perfil.saldoMensal + result;
                                    if (somaPrio45 < acumulo) {
                                        //e as prioridade 4 e 5 no quinto mês
                                    }
                                    else if (perfil.perfil.precoPrio4 < acumulo) {
                                        // e a prioridade 4 no quinto mês
                                        result = acumulo - perfil.perfil.precoPrio4;
                                        acumulo = perfil.perfil.saldoMensal + result;
                                        if (perfil.perfil.precoPrio5 > acumulo) {
                                            acumulo = acumulo + perfil.perfil.saldoMensal;
                                            if (perfil.perfil.precoPrio5 > acumulo) {
                                                //A prioridade 5 custa mais de 2 meses do seu saldo mensal. Tem certeza que deseja comprar essa edição?
                                                //Se sim, você devera ficar mais de 2 meses sem comprar livros para economizar e comprar essa edição.
                                                //Se não, veja se há um versão mais em conta (capa brochura, ebook, audiobook)
                                            }
                                            else {
                                                // e a prioridade 5 no setimo mês
                                            }
                                        }
                                        else {
                                            // e a prioridade 5 no sexto mês
                                        }
                                    }
                                }else{
                                    
                                }
                            }
                            else if () {

                            }
                        }
                    }
                }
            }

        })
    }


    return (
        <>
            <h2>Queremos te conhecer um pouco</h2>
            <form className={styles.formConhecer}>
                <p><label className={styles.labelConhecer}>Quanto você pode gastar por mês com livros? </label></p>
                <p><input type='number' name='PossivelGastar' className={styles.campoSaldoMensal} id='PossivelGastar' require /></p>

                {/* <p><label className={styles.labelConhecer}>Preferência </label></p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisico' require />Físico</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebook' require />E-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='audiobook' require />Audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoebook' require />Fisico e e-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoaudio' require />Fisico e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebookaudio' require />E-book e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='todos' require />Todos</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='todos' require />Ambos</p> */}

                <p><label className={styles.labelConhecer}>Crie uma lista de prioridades </label></p>
                <div>
                    <label>1º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>
                    <label> Preço </label>
                    <input type='number' name='precoPrio1' className={styles.campoPrecoPrioridade} id='precoPrio1' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio1' className={styles.campoLojaPrioridade} id='lojaPrio1' />
                </div>

                <div>
                    <label> 2º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>
                    <label> Preço </label>
                    <input type='number' name='precoPrio2' className={styles.campoPrecoPrioridade} id='precoPrio2' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio2' className={styles.campoLojaPrioridade} id='lojaPrio2' />
                </div>

                <div>
                    <label> 3º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio3' className={styles.campoPrecoPrioridade} id='precoPrio3' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio3' className={styles.campoLojaPrioridade} id='lojaPrio3' />
                </div>

                <div>
                    <label> 4º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio4' className={styles.campoPrecoPrioridade} id='precoPrio4' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio4' className={styles.campoLojaPrioridade} id='lojaPrio4' />
                </div>

                <div>
                    <label> 5º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio5' className={styles.campoPrecoPrioridade} id='precoPrio5' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio5' className={styles.campoLojaPrioridade} id='lojaPrio5' require />
                </div>

                <p><label className={styles.labelConhecer} >Caso o saldo do mês não seja gasto, deseja que ele seja acumulado ou descartado?<br /> <small>Colocamos como descartado como padrão, para evitar compras excessivas sem planejamento</small></label></p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Acumulado</p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Descartado</p>

                {/* <input type='submit' value='Enviar' className={styles.buttonConhecer}></input> */}
                <button className={styles.buttonConhecer} onClick={(e) => { e.preventDefault(); handleOpen() }} value='Enviar'> Enviar</button>
            </form>
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Previsão
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            REGRAS DO BANCO
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default DetalhePerfilFinancas;